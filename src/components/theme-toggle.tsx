/* context shape */
type ThemeContextType = {
  isDark: boolean;
  toggleButton: () => void;
};

import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function ThemeToggle({
  isDark,
  toggleButton,
}: ThemeContextType) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isDark}
        onCheckedChange={toggleButton}
        className="cursor-pointer"
      />
      <Label>{isDark ? "Dark Mode" : "Light Mode"}</Label>
    </div>
  );
}
