// THEME-CONTEXT
import { useTheme } from "../../context/theme-context";

// SHADCN COMPONENT
import { Separator } from "../ui/separator";

// COMPONENT
import ThemeToggle from "../theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  // LIGHT-DARK MODE
  const { isDark, toggleButton } = useTheme();

  return (
    <div className="p-5 mx-auto 2xl:max-w-7xl flex items-center justify-between ">
      <h1 className="font-semibold text-lg">
        <span className="text-[#00092A] dark:text-white">K</span>
        <span className="text-[#EE3167]">M</span>
      </h1>

      <div className="flex items-center gap-2 h-5 ">
        <Button
          variant={"ghost"}
          onClick={() =>
            window.open(
              "https://redmine.lifejak.com/projects/keymailer/wiki/N8n_automation",
              "_blank",
            )
          }
        >
          Wiki
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant={"ghost"}
          onClick={() =>
            window.open("https://neightn-automations.indie-demo.com/", "_blank")
          }
        >
          Automation List
        </Button>
        <Separator orientation="vertical" />
        <ThemeToggle isDark={isDark} toggleButton={toggleButton} />
      </div>
    </div>
  );
}
