// AudioContext.tsx
import React, { createContext, useRef, useContext, ReactNode } from 'react';
import { Audio } from 'expo-av';

// TypeScript : définition de ce que le contexte audio mettra à disposition
// Trois fonctions : jouer une musique, arrêter la musique, jouer un effet sonore
type AudioContextType = {
  playMusic: (file: any, loop?: boolean) => Promise<void>;
  stopMusic: () => Promise<void>;
  playSoundEffect: (file: any) => Promise<void>;
};

// Création du contexte avec une valeur initiale nulle (il sera fourni plus bas)
const AudioContext = createContext<AudioContextType | null>(null);

// Fournisseur du contexte, qui englobe toute l'application
export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Référence stockant la musique actuellement jouée.
  // Cela permet de stopper ou décharger la musique en cours.
  const musicRef = useRef<Audio.Sound | null>(null);

  // Fonction pour jouer une musique de fond (bouclée ou non)
  const playMusic = async (file: any, loop = true) => {

    // Si une musique tourne déjà, on l'arrête et on libère les ressources
    if (musicRef.current) {
      await musicRef.current.stopAsync();
      await musicRef.current.unloadAsync();
    }

    // Chargement de la nouvelle musique
    const { sound } = await Audio.Sound.createAsync(
      file,
      { shouldPlay: true, isLooping: loop, volume: 1.0 }
    );

    // Stockage dans la référence
    musicRef.current = sound;
  };

  // Fonction pour arrêter la musique et libérer la ressource
  const stopMusic = async () => {
    if (musicRef.current) {
      await musicRef.current.stopAsync();
      await musicRef.current.unloadAsync();
      musicRef.current = null;
    }
  };

  // Fonction pour jouer un effet sonore ponctuel (non bouclé)
  const playSoundEffect = async (file: any) => {
    // Création du son, lecture immédiate
    const { sound } = await Audio.Sound.createAsync(
      file,
      { shouldPlay: true, isLooping: false, volume: 1.0 }
    );

    // Lecture de l'effet sonore
    await sound.playAsync();
    // Pas de référence conservée, Expo gère la libération après la lecture
  };

  // Mise à disposition des trois fonctions aux enfants du provider
  return (
    <AudioContext.Provider value={{ playMusic, stopMusic, playSoundEffect }}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook personnalisé pour récupérer facilement les fonctions audio dans les composants
export const useAudio = () => {
  const context = useContext(AudioContext);

  // Empêche l'utilisation du hook sans provider autour de l'arbre React
  if (!context) throw new Error('useAudio must be used within an AudioProvider');

  return context;
};