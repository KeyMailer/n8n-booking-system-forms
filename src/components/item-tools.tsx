// REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";

// TOOL TYPE FORMAT
import type { Tool } from "../lib/tools-data";

// SHADCN COMPONENT
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";

export default function ItemTools({
  name,
  description,
  path,
  available,
}: Tool) {
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
          disabled={!available}
        >
          {available ? "Book Now" : "TBA"}
        </Button>
      </ItemActions>
    </Item>
  );
}
