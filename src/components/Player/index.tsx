import { useState, useEffect, useRef, ChangeEvent } from "react";
import { IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";
import { SongType } from "../../types/SongType";
import { useCart } from "../Context/useMusic";
import { Controls } from "./Controls";
import { Description } from "./Description";
import { TimeSong } from "./TimeSong";

interface PlayerProps {
  player?: number;
}
export function Player({ player }: PlayerProps) {
  const {
    songs,
    volume,
    isPlaying,
    changeVolume,
    SkipSong,
    currentSongIndex,
    handleChangePlaying,
    handleChangeVolume,
    numbersSong,
  } = useCart();

  return (
    <>
      <div className={`bg-[#2A2141] rounded-lg p-9`}>
        <div className={`flex flex-col gap-7 ${!player ? "mt-3" : ""}`}>
          {!player ? (
            <Description
              img={songs[currentSongIndex].img}
              name={songs[currentSongIndex].name}
              artist={songs[currentSongIndex].artist}
              isPlaying={isPlaying}
              size={190}
            />
          ) : (
            <div className="flex flex-row gap-7">
              <Description
                img={songs[currentSongIndex].img}
                name={songs[currentSongIndex].name}
                artist={songs[currentSongIndex].artist}
                isPlaying={isPlaying}
                size={84}
              />
            </div>
          )}
          <Controls
            isPlaying={isPlaying}
            SkipSong={SkipSong}
            handleChangePlaying={handleChangePlaying}
          />
          {player === 3 ? (
            ""
          ) : (
            <>
              <TimeSong
                progress={numbersSong?.progress}
                length={numbersSong?.length}
                duration={numbersSong?.duration}
              />
            </>
          )}
        </div>
        {!player && (
          <div className="flex items-center justify-center gap-1 mt-2">
            <button onClick={changeVolume}>
              {volume === 0 && <IoVolumeMuteSharp size={20} />}
              {volume > 0 && <IoVolumeHighSharp size={20} />}
            </button>
            <input
              type="range"
              value={volume}
              min="0"
              max="100"
              step={5}
              onChange={handleChangeVolume}
              className="w-full h-1 accent-[#D9D9D9]/80 rounded-lg appearance-none cursor-pointer range-sm bg-[#D9D9D9]/30"
            />
          </div>
        )}
      </div>
    </>
  );
}
