// react
import { useEffect, useState } from "react";

// react-router-dom
import { useNavigate, useLocation } from "react-router-dom";

// icons
import {
  BookmarkX,
  CircleUser,
  Info,
  MoveLeft,
  CalendarX2,
} from "lucide-react";

// shadcn components
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function FullyBooked() {
  // data passed from navigate (form-container)
  const { state } = useLocation();

  // passed data stored here
  const [data, setData] = useState<any>(null);

  // navigate back to newsletter booking page
  const navigate = useNavigate();

  useEffect(() => {
    // check the state data and store in data state
    if (state?.data) {
      setData(state.data);
      return;
    }

    // get the data from session
    const storedData = sessionStorage.getItem("fullyBookedData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse fullyBookedData", e);
      }

      // clear after 10 seconds
      const timer = setTimeout(() => {
        sessionStorage.removeItem("fullyBookedData");
      }, 10000);

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

  // destruct the data
  const { newsletter, existingBookings = [], userInput } = data;

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
        <CalendarX2 size={28} className="text-destructive" />
        <p className="font-bold text-2xl">Fully Booked</p>

        <p className="text-foreground max-w-xl">
          Unfortunately, all available slots for this {newsletter} placement
          have been booked.
        </p>
      </div>

      {/* existing bookings */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3">
          Existing Bookings ({existingBookings.length})
        </h2>

        {existingBookings.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No existing bookings found.
          </p>
        ) : (
          <div className="grid gap-4">
            {existingBookings.map((booking: any) => (
              <Item variant="muted" key={booking.row_number}>
                <ItemMedia variant="icon">
                  <BookmarkX />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    Product Name: {booking.product_name}{" "}
                    <Badge variant="destructive" className="ml-auto">
                      {booking.newsletter_placement}
                    </Badge>
                  </ItemTitle>
                  <ItemDescription className="flex flex-col mt-2">
                    <span>Booked By: {booking.point_person}</span>
                    <span>Submitted At: {booking.submitted_at}</span>
                    <span>Scheduled: {booking.date_schedule}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        )}
      </div>

      {/* information section */}
      <Item variant="outline" className="border-chart-1 mt-2">
        <ItemMedia variant="icon">
          <Info className="text-blue-600 dark:text-blue-400" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs text-blue-600 dark:text-blue-400">
            If you still want to book this product, contact the person beside
            “Booked By” to ask if they can adjust their scheduled date. If they
            agree, contact Amy to update the existing booking’s schedule, then
            try to rebook again.
          </ItemTitle>
        </ItemContent>
      </Item>

      {/* user submission data */}
      {userInput && (
        <div className="mt-10">
          <h2 className="font-semibold text-lg mb-3">
            Your Submission Attempt
          </h2>

          <Item variant={"outline"}>
            <ItemMedia variant="icon">
              <CircleUser />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Name: {userInput.name}</ItemTitle>
              <ItemTitle>Newsletter: {userInput.newsletterType}</ItemTitle>
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

              {userInput.entries?.map((entry: any) => (
                <ItemDescription className="flex flex-col mt-2">
                  <span>Product Name: {entry.productName}</span>
                  <span>Placement: {entry.placementType}</span>

                  <span>
                    Scheduled:{" "}
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </ItemDescription>
              ))}
            </ItemContent>
          </Item>
        </div>
      )}
    </div>
  );
}
