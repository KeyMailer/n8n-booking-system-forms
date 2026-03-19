// shadcn component
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// shadcn component
import { Button } from "./ui/button";

// tool data
import type { Tool } from "../lib/tools-data";

// react-router-dom
import { useNavigate } from "react-router-dom";

export default function CardTools({ name, description, path }: Tool) {
  const navigate = useNavigate();
  return (
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          onClick={() => navigate(path)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
