import { Button } from "../../components/ui/button";
// react-router-dom
import { useNavigate, useLocation } from "react-router-dom";

// icons
import {
  BookmarkX,
  CircleUser,
  MoveLeft,
  CalendarMinus,
  BookmarkCheck,
} from "lucide-react";
import React, { useState, useEffect } from "react";

// shadcn components
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";
import NewsletterFullyBookedMsg from "./newsletter-fully-booked-msg";

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

  const {
    accepted = [], // array of confirmed bookings (id, date, productName, placementType, segment, purchaseType, slot)
    rejected = [], // array of failed bookings (id, date, productName, placementType, reason)
    userInput,
    existingBookings,
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
        <span>Book Again</span>
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
        <h2 className="font-semibold text-lg mb-3">
          Your Submission Attempt ({userInput.entries.length})
        </h2>

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

            {userInput.entries?.map((entry: any, index: number) => (
              <ItemDescription key={index} className="flex flex-col mt-2">
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
                <span>Segment: {entry.segment}</span>
                <span>Purchase Type: {entry.purchaseType}</span>
              </ItemDescription>
            ))}
          </ItemContent>
        </Item>
      </div>

      <div className="flex gap-5 my-10">
        {/*accepted bookings*/}
        <div className="w-1/2">
          <h2 className="font-semibold text-lg mb-3 text-green-600">
            Your Successful Bookings ({accepted.length})
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
                  <ItemDescription className="flex flex-col mt-2">
                    <span>Scheduled: {accept.date}</span>
                    <span>Segment: {accept.segment}</span>
                    <span>Purchase Type: {accept.purchaseType}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>

        {/*rejected bookings*/}
        <div className="w-1/2">
          <h2 className="font-semibold text-lg mb-3 text-destructive">
            Your Failed Bookings ({rejected.length})
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

                  <ItemDescription className="mt-2">
                    Reason: {reject.reason}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>
      </div>

      {/* existing bookings */}
      {existingBookings.length > 0 && (
        <React.Fragment>
          <h2 className="font-semibold text-lg mb-3">
            Existing Bookings ({existingBookings.length})
          </h2>

          <div className="grid gap-4">
            {existingBookings.map((booking: any) => (
              <Item variant="muted" key={booking.row_number}>
                <ItemMedia variant="icon">
                  <BookmarkCheck />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Booked By: {booking.point_person}</ItemTitle>
                  <ItemTitle>
                    Submitted At: {booking.submitted_at} (PH time)
                  </ItemTitle>

                  <ItemDescription className="flex flex-col mt-2">
                    <span>Product Name: {booking.product_name}</span>
                    <span>Placement: {booking.newsletter_placement}</span>
                    <span>Scheduled: {booking.date_schedule}</span>
                    <span>Segment: {booking.segment}</span>
                    <span>Purchase Type: {booking.purchase_type}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </React.Fragment>
      )}

      {/* information section */}
      <NewsletterFullyBookedMsg />
    </div>
  );
}
