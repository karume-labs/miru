import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GameOverModal } from "@/features/game/components/GameOverModal";
import { Grid } from "@/features/game/components/Grid";
import { Header } from "@/features/game/components/Header";
import { useGameStore } from "@/stores/useGameStore";

const SCREEN_OPTIONS = {
  title: "MEMORY",
  headerShown: false,
};

export default function GameScreen() {
  const { status, startGame } = useGameStore();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <LinearGradient
        colors={["#0ea5e9", "#2563eb"]} // Vibrant cyan to blue gradient matching logo
        className="flex-1 items-center justify-center p-4"
      >
        {status === "idle" ? (
          <View className="items-center justify-center gap-8">
            <Text className="text-4xl font-bold text-white font-mono tracking-widest text-center">
              MEMORY
            </Text>
            <Button
              onPress={startGame}
              className="bg-white/20 rounded-2xl border-4 border-white/50 px-10 py-5"
            >
              <Text className="text-white font-bold font-mono tracking-widest text-2xl">
                START
              </Text>
            </Button>
          </View>
        ) : (
          <View className="flex-1 w-full items-center justify-center gap-12">
            <Header />
            <Grid />
          </View>
        )}

        <GameOverModal />
      </LinearGradient>
    </>
  );
}
