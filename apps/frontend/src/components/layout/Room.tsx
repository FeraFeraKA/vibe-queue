import { Copy, Search } from "lucide-react";
import AnimatedList from "../ui/AnimatedList";
import { Button } from "../ui/button";

interface IRoom {
  code: string;
}

const Room = ({ code }: IRoom) => {
  return (
    <main className="mt-4 flex flex-1 flex-col">
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h3 className="uppercase tracking-[0.3em] text-muted-foreground">
            Room
          </h3>
          <p className="text-3xl font-bold">VibeQueue #{code}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline">
            <Copy />
            Copy Link
          </Button>
          <Button variant="outline">
            <Search />
            Search Tracks
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 lg:flex-1 lg:grid-cols-10 my-4">
        <div className="min-h-80 lg:col-span-7 lg:h-full border rounded-3xl bg-[#171717] p-6">
          <p className="text-muted-foreground">Now Playing</p>
          <div className="mt-4 border min-h-60 rounded-3xl border-dashed"></div>
          <p className="text-muted-foreground mt-6">Queue</p>
          <AnimatedList
            className="w-full"
            maxHeight="max-h-75"
            showGradients={false}
          />
        </div>
        <div className="min-h-80 lg:col-span-3 lg:h-full border rounded-3xl bg-[#171717] p-6">
          <p className="text-muted-foreground">Online Users</p>
          <AnimatedList
            className="w-full"
            maxHeight="max-h-151"
            showGradients={false}
          />
        </div>
      </section>
    </main>
  );
};

export default Room;
