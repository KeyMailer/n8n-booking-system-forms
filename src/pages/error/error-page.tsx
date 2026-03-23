import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

import { Button } from "../../components/ui/button";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      {/* back to home */}
      <Button
        variant={"ghost"}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 w-fit mb-5"
      >
        <MoveLeft />
        <span>Back Home</span>
      </Button>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance text-destructive">
        Error 404: Page not Found
      </h1>

      <p className="leading-7 mt-2 text-muted-foreground">
        Looks like this page went missing. Let’s get you back on track.
      </p>
    </div>
  );
}
