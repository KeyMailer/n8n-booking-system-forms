// REACT
import React from "react";

// ICONS
import { BookmarkX, CalendarX2, BookmarkCheck } from "lucide-react";

// SHADCN COMPONENTS
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

// COMPONENT
import NewsletterFullyBookedMsg from "./newsletter-fully-booked-msg";

// TYPE PROPS
interface FullyBookedMultiModeProps {
  message: string;
  existingBookings: any[];
  userInput?: any;
}

export default function FullyBookedMultiMode({
  message,
  existingBookings,
  userInput,
}: FullyBookedMultiModeProps) {
  return (
    <React.Fragment>
      {/* HEADER */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <CalendarX2 size={28} className="text-destructive" />
        <p className="font-bold text-2xl">Fully Booked</p>

        <p className="text-foreground max-w-xl">{message}</p>
      </div>

      {/* USER SUBMISSION DATA */}
      {userInput && (
        <div className="mt-10">
          <h2 className="font-semibold text-lg mb-3">
            Your Submission Attempt ({userInput.entries.length})
          </h2>

          <Item variant={"outline"}>
            <ItemMedia variant="icon">
              <BookmarkX />
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
      )}

      {/* EXISTING BOOKINGS */}
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
                  <BookmarkCheck />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Booked By: {booking.point_person} </ItemTitle>

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
        )}
      </div>

      {/* INFORMATION SECTION */}
      <NewsletterFullyBookedMsg />
    </React.Fragment>
  );
}
