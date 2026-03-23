// theme-context
import { useTheme } from "../../context/theme-context";
import ThemeToggle from "../theme-toggle";

export default function Navbar() {
  // light-dark mode
  const { isDark, toggleButton } = useTheme();

  return (
    <div className="p-5 mx-auto 2xl:max-w-7xl flex items-center justify-between ">
      <h1 className="font-semibold text-lg">Booking Forms</h1>
      <ThemeToggle isDark={isDark} toggleButton={toggleButton} />
    </div>
  );
}
