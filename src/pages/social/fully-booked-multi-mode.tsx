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

// COMPONENTS
import SocialFullyBookedMsg from "./social-fully-booked-msg";

// TYPE PROPS
interface SocialFullyBookedMultiModeProps {
  userInput: any;
  existingBookings: any[];
  entries: any;
}

export default function SocialFullyBookedMultiMode({
  userInput,
  existingBookings,
  entries,
}: SocialFullyBookedMultiModeProps) {
  return (
    <React.Fragment>
      {/* HEADER */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <CalendarX2 size={28} className="text-destructive" />
        <p className="font-bold text-2xl">Fully Booked</p>

        <p className="text-foreground max-w-xl">
          Unfortunately, bookings for Platinum, Gold, and Silver ad types are
          fully booked. We only accept a maximum of 5 bookings per day for these
          ad types.
        </p>
      </div>

      {/* USER SUBMISSION DATA */}
      {entries && (
        <div className="mt-10">
          <h2 className="font-semibold text-lg mb-3">
            Your Submission Attempt ({entries.failed.length})
          </h2>

          <Item variant={"outline"}>
            <ItemMedia variant="icon">
              <BookmarkX />
            </ItemMedia>

            <ItemContent>
              <ItemTitle>Name: {userInput.name}</ItemTitle>
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

              {entries.failed.map((rejected: any) => (
                <ItemDescription
                  className="flex flex-col mt-2"
                  key={rejected.id}
                >
                  <span>Product Name: {rejected.productName}</span>
                  <span>Ad Type: {rejected.adType}</span>
                  <span>Social Post Type: {rejected.socialPostType}</span>
                  <span>Platform: {rejected.platform}</span>
                  <span>
                    Scheduled:{" "}
                    {new Date(rejected.date).toLocaleDateString("en-US", {
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
              <Item variant={"muted"} key={booking.row_number}>
                <ItemMedia variant="icon">
                  <BookmarkCheck />
                </ItemMedia>

                <ItemContent>
                  <ItemTitle>Booked By: {booking.point_person}</ItemTitle>
                  <ItemTitle>Submitted At: {booking.submitted_at}</ItemTitle>

                  <ItemDescription className="flex flex-col mt-2">
                    <span>Product Name: {booking.product_name}</span>
                    <span>Ad Type: {booking.ad_type}</span>
                    <span>Social Post Type: {booking.social_post_type}</span>
                    <span>Platform: {booking.platform}</span>
                    <span>Scheduled: {booking.date_scheduled}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        )}
      </div>

      {/* INFORMATION SECTION */}
      <SocialFullyBookedMsg />
    </React.Fragment>
  );
}
