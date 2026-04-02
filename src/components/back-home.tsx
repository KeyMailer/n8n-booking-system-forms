import { useNavigate } from "react-router-dom"; // REACT
import { MoveLeft } from "lucide-react"; // ICONS
import { Button } from "./ui/button"; // SHADCN COMPONENT

export default function BackHome() {
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      onClick={() => navigate("/")}
      className="flex items-center gap-2 w-fit mt-5"
    >
      <MoveLeft />
      <span>Back Home</span>
    </Button>
  );
}
