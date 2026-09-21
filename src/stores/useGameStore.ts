import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { playError, playSuccess } from "@/services/audio";

export type GameStatus =
  | "idle"
  | "showing_sequence"
  | "waiting_for_user"
  | "game_over";

interface GameState {
  status: GameStatus;
  level: number;
  lives: number;
  gridSize: number;
  targetSquares: number[];
  selectedSquares: number[];
  highScore: number;

  // Actions
  startGame: () => void;
  nextLevel: () => void;
  showSequence: (targets: number[]) => void;
  waitForUser: () => void;
  selectSquare: (index: number) => void;
  loseLife: () => void;
  resetGame: () => void;
}

const INITIAL_STATE = {
  status: "idle" as GameStatus,
  level: 1,
  lives: 3,
  gridSize: 3,
  targetSquares: [],
  selectedSquares: [],
  highScore: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      startGame: () => {
        set({ ...INITIAL_STATE, status: "showing_sequence" });
        get().nextLevel();
      },

      nextLevel: () => {
        const { level } = get();
        // Increase grid size every 3 levels, max 7x7
        const newGridSize = Math.min(3 + Math.floor(level / 3), 7);
        // Number of squares to flash increases with level
        const numSquares = 3 + Math.floor(level / 2);

        // Generate random squares
        const totalSquares = newGridSize * newGridSize;
        const targets = new Set<number>();
        while (targets.size < numSquares) {
          targets.add(Math.floor(Math.random() * totalSquares));
        }

        const newLevel = level + 1;
        const { highScore } = get();
        const newHighScore = newLevel > highScore ? newLevel : highScore;

        set({
          level: newLevel,
          gridSize: newGridSize,
          targetSquares: Array.from(targets),
          selectedSquares: [],
          status: "showing_sequence",
          highScore: newHighScore,
        });
      },

      showSequence: (targets) =>
        set({ targetSquares: targets, status: "showing_sequence" }),

      waitForUser: () => set({ status: "waiting_for_user" }),

      selectSquare: (index: number) => {
        const { status, targetSquares, selectedSquares, lives } = get();

        if (status !== "waiting_for_user") return;
        if (selectedSquares.includes(index)) return;

        if (targetSquares.includes(index)) {
          playSuccess();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          const newSelected = [...selectedSquares, index];
          set({ selectedSquares: newSelected });

          if (newSelected.length === targetSquares.length) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setTimeout(() => get().nextLevel(), 1000);
          }
        } else {
          playError();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

          const newLives = lives - 1;
          set({ lives: newLives });

          if (newLives <= 0) {
            set({ status: "game_over" });
          }
        }
      },

      loseLife: () => {
        const { lives } = get();
        if (lives > 1) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          set({ lives: lives - 1 });
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          set({ lives: 0, status: "game_over" });
        }
      },

      resetGame: () => {
        set((state) => ({ ...INITIAL_STATE, highScore: state.highScore }));
      },
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ highScore: state.highScore }),
    },
  ),
);
