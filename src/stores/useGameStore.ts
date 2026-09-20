import { create } from "zustand";
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
};

export const useGameStore = create<GameState>((set, get) => ({
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

    set({
      level: level + 1,
      gridSize: newGridSize,
      targetSquares: Array.from(targets),
      selectedSquares: [],
      status: "showing_sequence",
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
      // Correct!
      playSuccess();
      const newSelected = [...selectedSquares, index];
      set({ selectedSquares: newSelected });

      if (newSelected.length === targetSquares.length) {
        // Level complete
        setTimeout(() => get().nextLevel(), 1000);
      }
    } else {
      // Wrong!
      playError();
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
      set({ lives: lives - 1 });
    } else {
      set({ lives: 0, status: "game_over" });
    }
  },

  resetGame: () => set({ ...INITIAL_STATE }),
}));
