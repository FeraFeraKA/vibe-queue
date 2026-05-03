import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

const Navbar = () => {
  return (
    <>
      <nav>
        <MobileBar />
        <DesktopBar />
      </nav>
    </>
  );
};

export default Navbar;
