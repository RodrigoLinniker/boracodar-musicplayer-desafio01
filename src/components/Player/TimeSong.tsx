interface TimeSongProps {
  progress: number | undefined;
  length: number | undefined;
  duration: number | undefined;
}
export function TimeSong({ progress, length, duration }: TimeSongProps) {
  const secondsToMinutes = (seconds: number | undefined) => {
    if (seconds) {
      const minutes = new Date(seconds * 1000)
        .toLocaleDateString(navigator.language, {
          minute: "2-digit",
          second: "2-digit",
        })
        .substring(12, 20);
      return minutes;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex h-[6px] bg-[#D9D9D9]/30  rounded-lg">
          <div
            style={{ width: progress + "%" }}
            className={` h-[6px] rounded-lg bg-[#D9D9D9]/80`}
          ></div>
        </div>
        <div className="w-full flex justify-between ">
          <p>{secondsToMinutes(length)}</p>
          <p>{secondsToMinutes(duration)}</p>
        </div>
      </div>
    </>
  );
}
