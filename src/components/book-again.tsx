import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { Button } from "./ui/button";

interface BookAgainProps {
  to: string;
  label?: string;
}

export default function BookAgain({
  to,
  label = "Book Again",
}: BookAgainProps) {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className="flex items-center gap-2 w-fit"
    >
      <MoveLeft />
      <span>{label}</span>
    </Button>
  );
}
