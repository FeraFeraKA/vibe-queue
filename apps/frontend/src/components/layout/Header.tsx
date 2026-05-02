import MobileBar from "./MobileBar";

const Header = () => {
  return (
    <>
      <header>
        <div className="flex h-16 items-center justify-between p-3">
          <h1 className="text-2xl font-bold">VibeQueue</h1>
          <MobileBar />
        </div>
      </header>
    </>
  );
};

export default Header;
