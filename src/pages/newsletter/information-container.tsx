import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../components/ui/item";

import { Separator } from "../../components/ui/separator";

export default function InformationContainer() {
  return (
    <div className="w-full lg:w-1/3 lg:sticky lg:top-5 h-fit">
      {/*information */}

      <Item variant="muted">
        <ItemContent>
          <ItemTitle className="text-lg">
            Newsletter Schedule & Capacity
          </ItemTitle>

          <ItemTitle className="mt-5 mb-2">
            Influencer Newsletter (Monday & Friday)
          </ItemTitle>
          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Featured</span>

            <span>1 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Featured Demo</span>

            <span>1 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Promoted</span>

            <span>6 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Standard</span>

            <span>6 max</span>
          </ItemDescription>

          <ItemDescription className="mt-5 mb-3 text-xs">
            Note: If a Featured Demo is present, the standard maximum has been
            reduced to 5.
          </ItemDescription>

          <Separator />

          <ItemTitle className="mt-3 mb-2">
            Press Newsletter (Monday, Wednesday, & Friday)
          </ItemTitle>
          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Featured</span>

            <span>1 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Featured Demo</span>

            <span>1 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white  font-semibold">
            <span>Promoted</span>

            <span>4 max</span>
          </ItemDescription>

          <ItemDescription className="flex justify-between text-black dark:text-white font-semibold">
            <span>Standard</span>

            <span>8 max</span>
          </ItemDescription>

          <ItemDescription className="mt-5 mb-3 text-xs">
            Note: If a Featured Demo is present, the standard maximum has been
            reduced to 7.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
