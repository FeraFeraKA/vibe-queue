"use client";

import { mockSearchTracks } from "@/mok";
import { Check, Copy, Search } from "lucide-react";
import Image from "next/image";
import AnimatedList from "../ui/AnimatedList";
import { Button } from "../ui/button";

interface IRoom {
  code: string;
  isOpen: boolean;
  isCopied: boolean;
  handleOpen: (flag: boolean) => void;
  handleCopyLink: () => Promise<void>;
}

const Room = ({
  code,
  isCopied,
  handleOpen,
  handleCopyLink,
}: IRoom) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-5xl min-h-screen mx-auto z-10 relative px-4">
        <main className="mt-4 flex flex-1 flex-col">
          <section className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="uppercase tracking-[0.3em] text-muted-foreground">
                Room
              </h3>
              <p className="text-3xl font-bold">Vibe Queue #{code}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outline" onClick={handleCopyLink}>
                {isCopied ? (
                  <>
                    <Check />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy />
                    Copy Link
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={() => handleOpen(true)}>
                <Search />
                Search Tracks
              </Button>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-6 lg:flex-1 lg:grid-cols-10 my-4">
            <div className="min-h-80 lg:col-span-7 lg:h-full border rounded-3xl bg-[#171717] p-6">
              <p className="text-muted-foreground">Now Playing</p>
              <div className="flex flex-col md:flex-row items-center mt-4 p-4 border min-h-60 rounded-3xl border-dashed">
                <Image
                  src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
                  alt="Now Playing"
                  width={200}
                  height={200}
                  className="rounded-3xl"
                />
                <div className="mx-auto text-center">
                  <p className="text-3xl font-bold mt-4 md:mt-0">
                    Blinding Lights
                  </p>
                  <p className="text-lg text-muted-foreground mt-1 max-w-75">
                    The Weeknd
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">Queue</p>
              <AnimatedList
                className="w-full"
                maxHeight="max-h-75"
                showGradients={false}
                items={mockSearchTracks.map(
                  (track) => track.title + " - " + track.artistText,
                )}
              />
            </div>
            <div className="min-h-80 lg:col-span-3 lg:h-full border rounded-3xl bg-[#171717] p-6">
              <p className="text-muted-foreground">Online Users</p>
              <AnimatedList
                className="w-full"
                maxHeight="max-h-151"
                showGradients={false}
                items={[
                  "Fera",
                  "Sophie",
                  "Alex",
                  "Jordan",
                  "Taylor",
                  "Morgan",
                  "Casey",
                ]}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Room;
