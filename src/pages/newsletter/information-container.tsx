import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../components/ui/item";

export default function InformationContainer() {
  return (
    <div className="w-full lg:w-1/4 lg:sticky lg:top-5 h-fit ml-auto">
      {/* QUICK NOTE */}
      <Item variant={"muted"}>
        <ItemContent>
          <ItemTitle>Quick Note</ItemTitle>
          <ItemDescription className="line-clamp-5">
            Influencer: Mon & Fri only. Press: Mon, Wed & Fri. Both: Mon & Fri
            only.
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* INFLUENCER */}
      <Item className="my-2" variant={"muted"}>
        <ItemContent>
          <ItemTitle>Influencer Newsletter</ItemTitle>
          <ItemDescription>
            Below are the maximum slots for each placement.
          </ItemDescription>

          <ItemDescription className="mt-3 flex justify-between text-black dark:text-white ">
            <span>Featured</span>
            <span>1 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Featured Demo</span>
            <span>1 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Promoted</span>
            <span>6 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Standard</span>
            <span>6 max</span>
          </ItemDescription>

          <ItemDescription className="mt-5 line-clamp-3">
            Note: If a Featured Demo is present, the standard maximum has been
            reduced to 5.
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* PRESS */}
      <Item variant={"muted"}>
        <ItemContent>
          <ItemTitle>Press Newsletter</ItemTitle>
          <ItemDescription>
            Below are the maximum slots for each placement.
          </ItemDescription>

          <ItemDescription className="mt-3 flex justify-between text-black dark:text-white ">
            <span>Featured</span>
            <span>1 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Featured Demo</span>
            <span>1 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Promoted</span>
            <span>4 max</span>
          </ItemDescription>
          <ItemDescription className="flex justify-between text-black dark:text-white ">
            <span>Standard</span>
            <span>8 max</span>
          </ItemDescription>

          <ItemDescription className="mt-5 line-clamp-3">
            Note: If a Featured Demo is present, the standard maximum has been
            reduced to 7.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
