/* context shape */
type ThemeContextType = {
  isDark: boolean;
  toggleButton: () => void;
};

// icons
import { Eclipse } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle({
  isDark,
  toggleButton,
}: ThemeContextType) {
  return (
    <Button variant="ghost" onClick={toggleButton} className="p-2">
      <Eclipse
        size={20}
        className={`transition ${isDark ? "rotate-180" : ""}`}
      />
    </Button>
  );
}
