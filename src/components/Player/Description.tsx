interface DescriptionProps {
  img: string;
  name: string;
  artist: string;
  isPlaying: boolean;
  size: number;
}
export function Description({
  img,
  name,
  size,
  artist,
  isPlaying,
}: DescriptionProps) {
  return (
    <>
      <div
        className={`w-full overflow-hidden rounded-lg self-center`}
        style={{ maxWidth: size, height: size }}
      >
        <img
          className={`w-full h-full object-cover ${
            isPlaying ? "animate-pulse" : ""
          } `}
          src={`/assets/music/${img}.jpg`}
          alt={name}
        />
      </div>
      <div className="w-full max-w-[190px] flex flex-col gap-2">
        <h1 className=" font-bold text-2xl">{name}</h1>
        <h1 className="text-[#E1E1E6] opacity-[0.67] text-xl">{artist}</h1>
      </div>
    </>
  );
}
