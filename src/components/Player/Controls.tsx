import { ChangeEvent } from "react";
import {
  IoPause,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoVolumeHighSharp,
  IoVolumeMuteSharp,
} from "react-icons/io5";

interface ControlsProps {
  isPlaying: boolean;
  SkipSong: (next: boolean) => void;
  handleChangePlaying: () => void;
}

export function Controls({
  isPlaying,
  SkipSong,
  handleChangePlaying,
}: ControlsProps) {
  return (
    <>
      <div className="w-full flex gap-14 justify-center">
        <button
          onClick={() => {
            SkipSong(false);
          }}
        >
          <IoPlayBack size={29} />
        </button>
        <button onClick={handleChangePlaying}>
          {!isPlaying && <IoPlay size={29} />}
          {isPlaying && <IoPause size={29} />}
        </button>
        <button
          onClick={() => {
            SkipSong(true);
          }}
        >
          <IoPlayForward size={29} />
        </button>
      </div>
    </>
  );
}
