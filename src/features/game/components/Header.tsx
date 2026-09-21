import { Heart } from "lucide-react-native";
import { View } from "react-native";
import { withUniwind } from "uniwind";
import { Text } from "@/components/ui/text";
import { useGameStore } from "@/stores/useGameStore";

const StyledView = withUniwind(View);

export function Header() {
  const level = useGameStore((state) => state.level);
  const lives = useGameStore((state) => state.lives);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <StyledView className="flex-row items-center justify-between p-4 w-full max-w-md">
      <StyledView>
        <Text className="text-2xl font-bold text-white font-mono tracking-widest">
          LEVEL {level}
        </Text>
        <Text className="text-sm font-medium text-white/70 font-mono tracking-widest mt-1">
          BEST: {highScore}
        </Text>
      </StyledView>
      <StyledView className="flex-row gap-1">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            size={24}
            color={i < lives ? "#ef4444" : "#525252"}
            fill={i < lives ? "#ef4444" : "transparent"}
          />
        ))}
      </StyledView>
    </StyledView>
  );
}
