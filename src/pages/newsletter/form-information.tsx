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
      <Item variant="outline" className="border-chart-1 mb-2">
        <ItemMedia variant="icon">
          <Info className="text-blue-600 dark:text-blue-400" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs text-blue-600 dark:text-blue-400">
            We accept a maximum of 13 bookings per day. Please plan your
            placements accordingly.
          </ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="outline" className="border-chart-1">
        <ItemMedia variant="icon">
          <Info className="text-blue-600 dark:text-blue-400" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs text-blue-600 dark:text-blue-400 line-clamp-0 items-center">
            Before you book a newsletter, please make sure to check the
            availability in this{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1DnlRKLkrYxVK5uNoF7I9DpkQf0hIz_Aec3E3CDdNvVU/edit?gid=450992887#gid=450992887"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white"
            >
              document.
            </a>
          </ItemTitle>
        </ItemContent>
      </Item>
    </React.Fragment>
  );
}
