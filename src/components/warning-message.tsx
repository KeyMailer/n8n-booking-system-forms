import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

import { TriangleAlert } from "lucide-react";

type MessageInputProps = {
  message: string;
};

export default function WarningMessage({ message }: MessageInputProps) {
  return (
    <Item
      variant="outline"
      className="border border-amber-700 dark:border-amber-400"
    >
      <ItemMedia variant="icon">
        <TriangleAlert className="text-amber-700 dark:text-amber-400" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-xs text-amber-700 dark:text-amber-400">
          {message}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
