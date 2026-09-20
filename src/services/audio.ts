import { Audio } from "expo-av";

let successSound: Audio.Sound | null = null;
let errorSound: Audio.Sound | null = null;

export async function preloadSounds() {
  try {
    const { sound: s1 } = await Audio.Sound.createAsync(
      require("@/assets/sounds/success.wav"),
    );
    successSound = s1;

    const { sound: s2 } = await Audio.Sound.createAsync(
      require("@/assets/sounds/error.wav"),
    );
    errorSound = s2;
  } catch (e) {
    console.error("Failed to preload sounds", e);
  }
}

export async function playSuccess() {
  try {
    if (successSound) {
      await successSound.replayAsync();
    }
  } catch (_e) {
    // Ignore audio errors during rapid play
  }
}

export async function playError() {
  try {
    if (errorSound) {
      await errorSound.replayAsync();
    }
  } catch (_e) {
    // Ignore audio errors during rapid play
  }
}
