import Avatar from "./Avatar";
import { MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex items-center justify-between min-h-20 max-h-18 h-16 w-full bg-gray-200 dark:bg-[var(--accent-color-2)] px-20">
      <div className="flex items-center">
        <img
          src="logo.jpg"
          className="w-10 h-10 object-cover rounded-md"
          alt="Lumina logo"
        />
        <span className="text-white font-semibold block ml-4">Lumina</span>
      </div>
      <div className="flex">
        <Avatar userName={"Daniel"} />
        <button>
          <MdLogout className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
