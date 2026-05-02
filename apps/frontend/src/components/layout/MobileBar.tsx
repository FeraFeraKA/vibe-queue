import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const MobileBar = () => {
  return (
    <>
      <div className="md:hidden flex">
        <Sheet>
          <SheetTrigger>
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <span className="h-px bg-gray-300"></span>
            <nav className="mt-8 mx-5 flex flex-col gap-2">
              <Link href="/">Home</Link>
              <Link href="/room/create">Create room</Link>
              <Link href="/room/join">Join room</Link>
              <Link href="/about">About</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileBar;
