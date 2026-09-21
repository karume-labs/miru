import { StyleSheet } from "react-native";
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
      <AlertDialogContent style={styles.content}>
        <AlertDialogHeader style={styles.header}>
          <AlertDialogTitle style={styles.title}>GAME OVER</AlertDialogTitle>
          <AlertDialogDescription style={styles.description}>
            YOU REACHED LEVEL {level}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter style={styles.footer}>
          <Button onPress={startGame} style={styles.button}>
            <Text className="text-white font-bold font-mono tracking-widest text-xl">
              TRY AGAIN
            </Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    maxWidth: 400,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 1)",
    backgroundColor: "rgb(15, 23, 42)",
    padding: 24,
    borderRadius: 24,
    width: "100%",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
