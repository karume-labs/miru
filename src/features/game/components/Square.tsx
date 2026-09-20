import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SquareProps {
  isActive: boolean; // True if it's currently flashing or selected correctly
  isWrong: boolean; // True if selected incorrectly
  onPress: () => void;
  disabled: boolean;
}

export function Square({ isActive, isWrong, onPress, disabled }: SquareProps) {
  const scale = useSharedValue(1);
  const colorProgress = useSharedValue(0); // 0 = idle, 1 = active, 2 = wrong

  useEffect(() => {
    if (isWrong) {
      colorProgress.value = withTiming(2, { duration: 150 });
    } else if (isActive) {
      colorProgress.value = withTiming(1, { duration: 150 });
    } else {
      colorProgress.value = withTiming(0, { duration: 150 });
    }
  }, [isActive, isWrong, colorProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1, 2],
      ["#3b82f6", "#ffffff", "#ef4444"], // blue-500, white, red-500
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.9);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        {
          width: "100%",
          aspectRatio: 1,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "#1e3a8a", // blue-900
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        },
        animatedStyle,
      ]}
    />
  );
}
