import {
  createContext,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { songs } from "../../types/Songs";

import { SongType } from "../../types/SongType";

interface CartProviderProps {
  children: ReactNode;
}

interface NumbersSongPros {
  duration: number;
  progress?: number;
  length: number;
}

interface CartMusicData {
  songs: SongType[];
  isPlaying: boolean;
  volume: number;
  currentSongIndex: number;
  saveVolume: number;
  numbersSong: NumbersSongPros;
  SkipSong: (next: boolean) => void;
  handleChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  changeVolume: () => void;
  handleChangePlaying: () => void;
}

const CartContext = createContext<CartMusicData>({} as CartMusicData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const audioEl = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [saveVolume, setSaveVolume] = useState(50);
  const [numbersSong, setNumbersSong] = useState<NumbersSongPros>({
    duration: 126.537175,
    length: 0.188157,
  });

  useEffect(() => {
    const music = audioEl.current;

    if (music) {
      music!.volume = volume / 100;
    }

    if (isPlaying) {
      music?.play();
    } else {
      music?.pause();
    }
  });

  const SkipSong = (next: boolean) => {
    if (next) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }
        if (!isPlaying) {
          setIsPlaying(!isPlaying);
        }
        audioEl.current!.currentTime = 0;
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = songs.length - 1;
        }

        if (!isPlaying) {
          setIsPlaying(!isPlaying);
        }
        audioEl.current!.currentTime = 0;
        return temp;
      });
    }
  };

  const onPlaying = () => {
    const music = audioEl.current;
    const duration = Number(music?.duration);
    const ct = Number(music?.currentTime);

    if (isPlaying && ct === duration) {
      SkipSong(true);
    }
    setNumbersSong({
      length: ct,
      progress: (ct / duration) * 100,
      duration: duration,
    });
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));

    if (Number(e.target.value) !== 0) {
      setSaveVolume(Number(e.target.value));
    }
  };

  const changeVolume = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(saveVolume);
    }
  };

  const handleChangePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <CartContext.Provider
      value={{
        songs,
        isPlaying,
        volume,
        currentSongIndex,
        saveVolume,
        numbersSong,
        SkipSong,
        handleChangeVolume,
        changeVolume,
        handleChangePlaying,
      }}
    >
      <>
        <audio
          src={`/src/music/${songs[currentSongIndex].src}.mp3`}
          ref={audioEl}
          onTimeUpdate={onPlaying}
        ></audio>
        {children}
      </>
    </CartContext.Provider>
  );
}

export function useCart(): CartMusicData {
  const context = useContext(CartContext);

  return context;
}
