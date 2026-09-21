import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useGameStore } from "@/stores/useGameStore";

export function GameOverModal() {
  const { status, level, startGame } = useGameStore();

  return (
    <AlertDialog open={status === "game_over"}>
      <AlertDialogContent className="bg-slate-900 border border-slate-700 rounded-3xl">
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle className="text-4xl font-bold text-white font-mono tracking-widest text-center">
            GAME OVER
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-white/80 font-mono text-center mt-2">
            YOU REACHED LEVEL {level}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 items-center flex-row justify-center">
          <Button
            onPress={startGame}
            className="bg-white/20 rounded-2xl border-4 border-white/50 px-8 py-4"
          >
            <Text className="text-white font-bold font-mono tracking-widest text-xl">
              TRY AGAIN
            </Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
