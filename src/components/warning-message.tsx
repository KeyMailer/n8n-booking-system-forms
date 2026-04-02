// SHADCN COMPONENT
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

// ICONS
import { TriangleAlert } from "lucide-react";

// MESSAGE TYPE
type MessageInputProps = {
  message: string;
};

export default function WarningMessage({ message }: MessageInputProps) {
  return (
    <Item variant="muted" className="bg-[#FEF7E0] dark:bg-[#4B3F1C] ">
      <ItemMedia variant="icon">
        <TriangleAlert className="text-amber-700 dark:text-amber-400" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-xs text-black dark:text-white">
          {message}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
