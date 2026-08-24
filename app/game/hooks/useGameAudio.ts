import { useEffect, useRef, useState } from 'react';

export type AudioCue = 'click' | 'confirm' | 'error' | 'drop';

export function useGameAudio() {
  const [soundOn, setSoundOn] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const effectRefs = useRef<Partial<Record<AudioCue, HTMLAudioElement>>>({});

  useEffect(() => {
    const music = new Audio('/audio/covert-action.ogg');
    const restartMusic = () => {
      music.currentTime = 0;
      void music.play().catch(() => setSoundOn(false));
    };
    music.loop = false;
    music.volume = 0.14;
    music.preload = 'auto';
    music.addEventListener('ended', restartMusic);
    musicRef.current = music;

    effectRefs.current = {
      click: new Audio('/audio/ui-click.ogg'),
      confirm: new Audio('/audio/ui-confirm.ogg'),
      error: new Audio('/audio/ui-error.ogg'),
      drop: new Audio('/audio/ui-drop.ogg'),
    };
    Object.values(effectRefs.current).forEach((effect) => {
      if (!effect) return;
      effect.volume = 0.24;
      effect.preload = 'auto';
    });

    return () => {
      music.removeEventListener('ended', restartMusic);
      music.pause();
      Object.values(effectRefs.current).forEach((effect) => effect?.pause());
    };
  }, []);

  function playEffect(cue: AudioCue, force = false) {
    if (!soundOn && !force) return;
    const source = effectRefs.current[cue];
    if (!source) return;
    const effect = source.cloneNode() as HTMLAudioElement;
    effect.volume = source.volume;
    void effect.play().catch(() => undefined);
  }

  function enableSound() {
    setSoundOn(true);
    void musicRef.current?.play().catch(() => setSoundOn(false));
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      void musicRef.current?.play().catch(() => setSoundOn(false));
    } else {
      musicRef.current?.pause();
    }
  }

  return { soundOn, playEffect, enableSound, toggleSound };
}
