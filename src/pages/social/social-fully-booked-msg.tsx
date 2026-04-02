// SHADCN COMPONENTS
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

// ICONS
import { Info } from "lucide-react";

export default function SocialFullyBookedMsg() {
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
          Ben to update the booking scheduled date, then try booking again.
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
