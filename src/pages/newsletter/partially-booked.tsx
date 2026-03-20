import { Button } from "../../components/ui/button";
// react-router-dom
import { useNavigate, useLocation } from "react-router-dom";

// icons
import {
  BookmarkX,
  CircleUser,
  Info,
  MoveLeft,
  CalendarMinus,
  BookmarkCheck,
} from "lucide-react";
import { useState, useEffect } from "react";

// shadcn components
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";
import { Badge } from "../../components/ui/badge";

export default function PartiallyBooked() {
  const { state } = useLocation();
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check the state data and store in data state
    if (state?.data) {
      setData(state.data);
      return;
    }

    // get the data from session
    const storedData = sessionStorage.getItem("partiallyBookedData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse partiallyBookedData", e);
      }

      // clear after 10 seconds
      const timer = setTimeout(() => {
        sessionStorage.removeItem("partiallyBookedData");
      }, 600000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  // if there's no data return show this message
  if (!data) {
    return (
      <div className="p-5 text-center">
        <p>No booking data found.</p>
      </div>
    );
  }

  const {
    message, // "Partial: 4 booked, 2 rejected"
    accepted = [], // array of confirmed bookings (id, date, productName, placementType, segment, purchaseType, slot)
    rejected = [], // array of failed bookings (id, date, productName, placementType, reason)
    userInput,
  } = data;

  return (
    <div className="p-5 mx-auto 2xl:max-w-5xl">
      {/* back to newsletter booking */}
      <Button
        variant={"ghost"}
        onClick={() => navigate("/newsletter-booking")}
        className="flex items-center gap-2 w-fit"
      >
        <MoveLeft />
        <span>Back</span>
      </Button>

      {/* header */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <CalendarMinus size={28} className="text-destructive" />
        <p className="font-bold text-2xl">Partially Booked</p>

        <p className="text-foreground max-w-xl">
          Your request was partially successful. Some bookings were confirmed,
          while others failed due to unavailable slots.
        </p>
      </div>

      {/*user submission data */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3">Your Submission Attempt</h2>

        <Item variant="outline" className="items-start">
          <ItemMedia variant="icon">
            <CircleUser className="mt-1" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Name: {userInput.name} </ItemTitle>
            <ItemTitle>Newsletter: {userInput.newsletterType} </ItemTitle>
            <ItemTitle>
              {" "}
              Submitted At:{" "}
              {new Date(userInput.submittedAt)
                .toLocaleString("en-US", {
                  timeZone: "Asia/Manila",
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(",", "")}{" "}
              (PH time)
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>

      {/*accepted bookings*/}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3 text-green-600">
          Confirmed Bookings ({accepted.length})
        </h2>

        <div className="grid gap-4 ">
          {accepted.map((accept: any) => (
            <Item variant="muted" key={accept.id} className="items-start">
              <ItemMedia variant="icon">
                <BookmarkCheck className="mt-1" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Product Name: {accept.productName} </ItemTitle>
                <ItemTitle>Placement: {accept.placementType} </ItemTitle>
                <ItemTitle>Segment: {accept.segment} </ItemTitle>
                <ItemTitle>Purchase Type: {accept.purchaseType} </ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>

      {/*rejected bookings*/}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3 text-destructive">
          Rejected Bookings ({rejected.length})
        </h2>

        <div className="grid gap-4 ">
          {rejected.map((reject: any) => (
            <Item variant="muted" key={reject.id} className="items-start">
              <ItemMedia variant="icon">
                <BookmarkX className="mt-1" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Product Name: {reject.productName} </ItemTitle>
                <ItemTitle>Placement: {reject.placementType} </ItemTitle>
                <ItemTitle>Scheduled: {reject.date} </ItemTitle>
                <ItemDescription>{reject.reason}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>

      {/* information section */}
      <Item variant="outline" className="border-chart-1 mt-2">
        <ItemMedia variant="icon">
          <Info className="text-blue-600 dark:text-blue-400" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs text-blue-600 dark:text-blue-400">
            Try to rebook this rejected booking on a different schedule, or if
            you insist, talk to one of your colleagues to adjust their schedule
            for the specific placement type.
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
