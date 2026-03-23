// shadcn components
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

// icons
import { Info } from "lucide-react";

export default function NewsletterFullyBookedMsg() {
  return (
    <Item
      variant="muted"
      className="bg-[#E0F2FE] dark:bg-[#1E3A8A] dark:text-white mt-5"
    >
      <ItemMedia variant="icon">
        <Info />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          Try booking again on a different schedule. If you prefer the same
          slot, contact the person listed under “Booked By” in the existing
          bookings to see if they can adjust their schedule. If they agree, ask
          Amy to update the placement’s scheduled date, then try booking again.
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
