import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useGameStore } from "@/stores/useGameStore";
import { Square } from "./Square";

export function Grid() {
  const {
    status,
    gridSize,
    targetSquares,
    selectedSquares,
    waitForUser,
    selectSquare,
  } = useGameStore();
  const [wrongSquare, setWrongSquare] = useState<number | null>(null);

  // When status changes to showing_sequence, wait 1s, then switch to waiting_for_user
  useEffect(() => {
    if (status === "showing_sequence") {
      const timer = setTimeout(() => {
        waitForUser();
      }, 1200); // Show sequence for 1.2 seconds
      return () => clearTimeout(timer);
    }
  }, [status, waitForUser]);

  const handlePress = (index: number) => {
    if (status !== "waiting_for_user") return;

    // Check if it's wrong just for UI feedback
    if (!targetSquares.includes(index) && !selectedSquares.includes(index)) {
      setWrongSquare(index);
      setTimeout(() => setWrongSquare(null), 500);
    }

    selectSquare(index);
  };

  const { width: screenWidth } = useWindowDimensions();
  const gap = 8;
  const padding = 16;
  const availableWidth = screenWidth - padding * 2;
  // Subtract the gaps to get size per square
  const squareSize = (availableWidth - gap * (gridSize - 1)) / gridSize;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: availableWidth,
        gap: gap,
        justifyContent: "center",
      }}
    >
      {[...Array(gridSize * gridSize)].map((_, i) => {
        const isTarget = targetSquares.includes(i);
        const isSelected = selectedSquares.includes(i);

        let isActive = false;
        if (status === "showing_sequence" && isTarget) {
          isActive = true;
        } else if (status === "waiting_for_user" && isSelected) {
          isActive = true;
        }

        const isWrong = wrongSquare === i;

        return (
          <View key={i} style={{ width: squareSize, height: squareSize }}>
            <Square
              isActive={isActive}
              isWrong={isWrong}
              disabled={status !== "waiting_for_user" || isSelected}
              onPress={() => handlePress(i)}
            />
          </View>
        );
      })}
    </View>
  );
}
