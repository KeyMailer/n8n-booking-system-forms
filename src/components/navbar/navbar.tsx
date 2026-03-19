// react-router-dom
import { Link, useLocation } from "react-router-dom";

// theme-context
import { useTheme } from "../../context/theme-context";
import ThemeToggle from "../theme-toggle";

// tools data
import { tools } from "../../lib/tools-data";

export default function Navbar() {
  // light-dark mode
  const { isDark, toggleButton } = useTheme();

  const location = useLocation();

  // find the path field in tools data
  const currentTool = tools.find((tool) => tool.path === location.pathname);

  // dynamically change the title depends on the path
  const title = currentTool?.name || "Internal Booking";
  return (
    <div className="p-5 mx-auto 2xl:max-w-7xl flex items-center justify-between ">
      <Link to={"/"} className="font-bold text-lg text-[#E3496D]">
        {title}
      </Link>

      <ThemeToggle isDark={isDark} toggleButton={toggleButton} />
    </div>
  );
}
