/* CONTEXT TYPE */
type ThemeContextType = {
  isDark: boolean;
  toggleButton: () => void;
};

// SHADCN COMPONENT
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({
  isDark,
  toggleButton,
}: ThemeContextType) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleButton}
      className="cursor-pointer"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
