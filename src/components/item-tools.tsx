// react-router-dom
import { useNavigate } from "react-router-dom";

// tool type format
import type { Tool } from "../lib/tools-data";

// shadcn component
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Button } from "./ui/button";

export default function ItemTools({ name, description, path }: Tool) {
  const navigate = useNavigate();
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(path)}
          className="cursor-pointer"
        >
          Book Now
        </Button>
      </ItemActions>
    </Item>
  );
}
