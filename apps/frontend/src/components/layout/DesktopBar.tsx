import Link from "next/link";
import { Button } from "../ui/button";

const DesktopBar = () => {
  return (
    <>
      <div className="hidden md:flex items-center gap-4">
        <Button variant="outline">
          <Link href="/room/create">Create room</Link>
        </Button>
        <Button variant="outline">
          <Link href="/room/join">Join room</Link>
        </Button>
        <Button variant="outline">
          <Link href="/about">About</Link>
        </Button>
      </div>
    </>
  );
};

export default DesktopBar;
