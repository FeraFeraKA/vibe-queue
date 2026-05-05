"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const MainPage = () => {
  return (
    <main
      id="main"
      className="max-w-4xl 2xl:max-w-6xl mx-auto py-24 px-4 text-center z-10"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        Main Page
      </p>
      <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
        Create a live music queue.
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Vibe Queue lets friends search Spotify tracks, add songs to a shared
        queue, vote for the next track, and keep the vibe moving in real time.
      </p>
      <div className="flex items-center justify-center mt-6 gap-4">
        <Button
          variant="outline"
          className="rounded-xl text-xl h-12 bg-black text-white border-black hover:border-inherit
        dark:backdrop-blur-2xl dark:border-white/10 dark:bg-blue-700"
        >
          <Link href="/room/create">Get Started</Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-xl text-xl h-12
          dark:backdrop-blur-2xl dark:border-white/10 dark:bg-[#332b45]/10"
        >
          <Link href="/about">Learn more</Link>
        </Button>
      </div>
    </main>
  );
};

export default MainPage;
