import Link from "next/link";
import Navbar from "./Navbar";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <>
      <header className="max-w-5xl 2xl:max-w-7xl w-full mx-auto z-10 relative px-4">
        <div
          className="flex h-16 items-center justify-between
          border rounded-2xl my-2 px-3 bg-white/50 border-black/10
          backdrop-blur-2xl dark:border-white/10 dark:bg-[#332b45]/10 
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
