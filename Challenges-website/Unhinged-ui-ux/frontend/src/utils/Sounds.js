// 🔊 Regretail — Meme Sound Engine
// Put all MP3 files in: frontend/public/sounds/

let muted = false;
export const toggleMute = () => {
  muted = !muted;
  return muted;
};
export const isMuted = () => muted;

const play = (file, volume = 0.7) => {
  if (muted) return;
  try {
    const a = new Audio(`/sounds/${file}`);
    a.volume = volume;
    a.play().catch(() => {});
  } catch (_) {}
};

// 😱 Oh No (Kreepa) — price increases on hover
export const playOhNo = () => play("oh-no.mp3", 0.7);

// 📯 Air Horn — add to cart
export const playAirHorn = () => play("air-horn.mp3", 0.5);

// 💻 Windows XP Error — form validation fails
export const playWindowsError = () => play("windows-error.mp3", 0.7);

// 🟡 Among Us — popup appears (SUS 😳)
export const playSussy = () => play("among-us.mp3", 0.5);

// 🏆 Rizz — order confirmed
export const playRizz = () => play("rizz.mp3", 0.6);

// 😤 Fahh — extra frustration (your uploaded file)
export const playFahh = () => play("fahh.mp3", 0.8);

// 💀 Emotional Damage — fires after fake-offer betrayal popup
export const playEmotionalDamage = () => play("emotional-damage-meme.mp3", 0.9);

// 🪟 Windows XP Error Song — plays on site load with popup blitz
let xpAudio = null;
export const playWindowsXPSong = () => {
  if (xpAudio) return; // already playing
  try {
    xpAudio = new Audio("/sounds/windows-xp-error-song.mp3");
    xpAudio.volume = 0.4;
    xpAudio.loop = true;
    xpAudio.play().catch(() => {});
  } catch (_) {}
};
export const stopWindowsXPSong = () => {
  if (xpAudio) {
    xpAudio.pause();
    xpAudio.currentTime = 0;
    xpAudio = null;
  }
};
