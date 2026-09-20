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
          <Text className="text-4xl font-bold text-red-500 mb-4 font-mono tracking-widest text-center">
            GAME OVER
          </Text>

          <Text className="text-xl text-white mb-8 font-mono text-center">
            YOU REACHED LEVEL {level}
          </Text>

          <Button
            onPress={startGame}
            className="bg-blue-600 rounded-none border-2 border-white px-8 py-4"
          >
            <Text className="text-white font-bold font-mono tracking-widest">
              INSERT COIN
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
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    backgroundColor: "#000",
    borderWidth: 4,
    borderColor: "#ef4444",
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
});
