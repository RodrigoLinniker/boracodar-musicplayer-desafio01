import { useCart } from "../Context/useMusic";
import { Controls } from "../Player/Controls";
import { Description } from "../Player/Description";
import { TimeSong } from "../Player/TimeSong";

export function Player3() {
  const {
    songs,
    isPlaying,
    currentSongIndex,
    SkipSong,
    handleChangePlaying,
    numbersSong,
  } = useCart();

  return (
    <div className="bg-[#2A2141] rounded-lg p-7">
      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-7">
          <Description
            img={songs[currentSongIndex].img}
            name={songs[currentSongIndex].name}
            artist={songs[currentSongIndex].artist}
            isPlaying={isPlaying}
            size={84}
          />
        </div>
        <Controls
          isPlaying={isPlaying}
          SkipSong={SkipSong}
          handleChangePlaying={handleChangePlaying}
        />
        <TimeSong
          progress={numbersSong?.progress}
          length={numbersSong?.length}
          duration={numbersSong?.duration}
        />
      </div>
    </div>
  );
}
