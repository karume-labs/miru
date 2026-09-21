import { Heart } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useGameStore } from "@/stores/useGameStore";

export function Header() {
  const level = useGameStore((state) => state.level);
  const lives = useGameStore((state) => state.lives);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <View className="flex-row items-center justify-between p-4 w-full max-w-md">
      <View>
        <Text className="text-2xl font-bold text-white font-mono tracking-widest">
          LEVEL {level}
        </Text>
        <Text className="text-sm font-medium text-white/70 font-mono tracking-widest mt-1">
          BEST: {highScore}
        </Text>
      </View>
      <View className="flex-row gap-1">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            size={24}
            color={i < lives ? "#ef4444" : "#525252"}
            fill={i < lives ? "#ef4444" : "transparent"}
          />
        ))}
      </View>
    </View>
  );
}
