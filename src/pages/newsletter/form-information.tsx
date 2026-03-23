import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

import React from "react";

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
          <ItemTitle className="text-xs">
            We accept a maximum of 13 bookings per newsletter / day. Please plan
            your placements accordingly.
          </ItemTitle>
        </ItemContent>
      </Item>

      <Item
        variant="muted"
        className="bg-[#E0F2FE] dark:bg-[#1E3A8A] dark:text-white mb-2"
      >
        <ItemMedia variant="icon">
          <Info />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs line-clamp-0 items-center">
            Before you book a newsletter, please make sure to check the
            availability in this{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1DnlRKLkrYxVK5uNoF7I9DpkQf0hIz_Aec3E3CDdNvVU/edit?gid=450992887#gid=450992887"
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
