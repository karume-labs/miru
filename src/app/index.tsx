import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GameOverModal } from "@/features/game/components/GameOverModal";
import { Grid } from "@/features/game/components/Grid";
import { Header } from "@/features/game/components/Header";
import { useGameStore } from "@/stores/useGameStore";

export default function GameScreen() {
  const { status, startGame } = useGameStore();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#0ea5e9", "#2563eb"]} style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          {status === "idle" ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 32,
              }}
            >
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
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: 48,
              }}
            >
              <Header />
              <Grid />
            </View>
          )}

          <GameOverModal />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
