import { type AudioPlayer, createAudioPlayer, preload } from "expo-audio";

let successPlayer: AudioPlayer | null = null;
let errorPlayer: AudioPlayer | null = null;

export async function preloadSounds() {
  try {
    const successSource = require("../../assets/sounds/success.wav");
    const errorSource = require("../../assets/sounds/error.wav");

    await preload(successSource);
    await preload(errorSource);

    successPlayer = createAudioPlayer(successSource);
    errorPlayer = createAudioPlayer(errorSource);
  } catch (e) {
    console.error("Failed to preload sounds", e);
  }
}

export async function playSuccess() {
  try {
    if (successPlayer) {
      await successPlayer.seekTo(0);
      successPlayer.play();
    }
  } catch (_e) {
    // Ignore audio errors during rapid play
  }
}

export async function playError() {
  try {
    if (errorPlayer) {
      await errorPlayer.seekTo(0);
      errorPlayer.play();
    }
  } catch (_e) {
    // Ignore audio errors during rapid play
  }
}
