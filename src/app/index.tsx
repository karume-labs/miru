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
      <View className="flex-1 bg-black items-center justify-center p-4">
        {status === "idle" ? (
          <View className="items-center justify-center gap-8">
            <Text className="text-4xl font-bold text-white font-mono tracking-widest text-center">
              MEMORY
            </Text>
            <Button
              onPress={startGame}
              className="bg-blue-600 rounded-none border-2 border-white px-8 py-4"
            >
              <Text className="text-white font-bold font-mono tracking-widest text-xl">
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
      </View>
    </>
  );
}
