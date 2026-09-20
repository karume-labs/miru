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
      [
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 0.95)",
        "rgba(239, 68, 68, 0.95)",
      ],
    );

    const borderColor = interpolateColor(
      colorProgress.value,
      [0, 1, 2],
      [
        "rgba(255, 255, 255, 0.4)",
        "rgba(255, 255, 255, 0.95)",
        "rgba(239, 68, 68, 0.95)",
      ],
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
      borderColor,
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
          borderRadius: 24, // Rounder corners to match logo
          borderWidth: 4, // Thicker hollow border
        },
        animatedStyle,
      ]}
    />
  );
}
