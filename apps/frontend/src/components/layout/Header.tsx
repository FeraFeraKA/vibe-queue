import Link from "next/link";
import Navbar from "./Navbar";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <>
      <header>
        <div
          className="relative flex w-[70%] h-16 items-center justify-between mx-auto
          border rounded-2xl my-2 px-3 bg-white border-black/10 z-10
          dark:backdrop-blur-2xl dark:border-white/10 dark:bg-[#332b45]/10 
          "
        >
          <Link href="/" className="text-2xl font-bold text-center">
            Vibe Queue
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Navbar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
