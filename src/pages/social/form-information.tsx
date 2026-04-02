// REACT
import React from "react";

// SHADCN COMPONENTS
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

// ICONS
import { Info } from "lucide-react";

export default function FormInformation() {
  return (
    <React.Fragment>
      <Item
        variant="muted"
        className="bg-[#E0F2FE] dark:bg-[#1E3A8A] dark:text-white mb-2"
      >
        <ItemMedia variant="icon">
          <Info />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs line-clamp-0 items-center">
            Before you book a social, please make sure to check the availability
            in this{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1d2OFRNY6hNo_xvgCsnDQiNJJButSuVLlgzdOA8r3Psg/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 dark:text-yellow-500"
            >
              document.
            </a>
          </ItemTitle>
        </ItemContent>
      </Item>
    </React.Fragment>
  );
}
