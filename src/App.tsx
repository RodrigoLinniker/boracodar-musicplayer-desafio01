import { useState, useEffect } from "react";
import { Player } from "./components/Player";
import { Player2 } from "./components/Player2";
import { Player3 } from "./components/Player3";

import { songs } from "./types/Songs";

export default function App() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex gap-8 my-auto max-md:flex-col max-md:p-4 max-w-[888px]">
        <Player />
        <div className="flex flex-col justify-center items-center gap-8">
          <Player player={2} />
          <Player player={3} />
        </div>
      </div>
    </div>
  );
}
