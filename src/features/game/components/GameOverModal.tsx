import { Modal, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useGameStore } from "@/stores/useGameStore";

export function GameOverModal() {
  const { status, level, startGame } = useGameStore();

  return (
    <Modal visible={status === "game_over"} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text className="text-4xl font-bold text-white mb-4 font-mono tracking-widest text-center">
            GAME OVER
          </Text>

          <Text className="text-xl text-white/80 mb-8 font-mono text-center">
            YOU REACHED LEVEL {level}
          </Text>

          <Button
            onPress={startGame}
            className="bg-white/20 rounded-2xl border-4 border-white/50 px-8 py-4"
          >
            <Text className="text-white font-bold font-mono tracking-widest text-xl">
              TRY AGAIN
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.8)", // Slate-900 with opacity for glass effect
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
});
