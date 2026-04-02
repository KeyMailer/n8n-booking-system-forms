// REACT
import React, { useState, useEffect } from "react";

// REACT-ROUTER-DOM
import { useLocation } from "react-router-dom";

// ICONS
import { BookmarkX, CircleUser, BookmarkCheck } from "lucide-react";

// SHADCN COMPONENTS
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";

// COMPONENTS
import PartiallyBookedHeader from "@/components/partially-booked-header";
import SocialFullyBookedMsg from "./social-fully-booked-msg";
import RedirectIfNoData from "@/components/redirect-if-no-data";
import BookAgain from "@/components/book-again";

export default function SocialPartiallyBooked() {
  // DATA PASSED FROM THE NAVIGATE (FORM-CONTAINER)
  const { state } = useLocation();

  // PASSED DATA STORED HERE
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // CHECK SESSION STORAGE
  useEffect(() => {
    // CHECK THE STATE DATA AND STORE IN DATA STATE
    if (state?.data) {
      setData(state.data);
      setIsLoading(false);
      return;
    }

    // GET THE DATA FROM SESSION STORAGE
    const storedData = sessionStorage.getItem("socialPartiallyBookedData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse socialPartiallyBookedData", e);
      }

      // REMOVE THE DATA AFTER 10 SECONDS
      const timer = setTimeout(() => {
        sessionStorage.removeItem("socialPartiallyBookedData");
      }, 10000);

      setIsLoading(false);
      return () => clearTimeout(timer);
    }

    setIsLoading(false);
  }, [state]);

  // WAIT UNTIL EFFECT HAS RUN BEFORE DECIDING TO REDIRECT
  if (isLoading) return null;

  // IF THERE'S NO DATA RETURN REDIRECT IT
  if (!data) {
    return <RedirectIfNoData data={data} redirectTo="/social-booking" />;
  }

  const { userInput, entries, existingBookings = [] } = data;

  // FLATTEN ENTRIES
  const allEntries = [...entries.success, ...entries.failed];

  const totalEntries = allEntries.length;

  return (
    <div className="p-5 mx-auto 2xl:max-w-5xl">
      {/* BACK TO SOCIAL BOOKING */}
      <BookAgain to="/social-booking" />

      {/* HEADER */}
      <PartiallyBookedHeader />

      {/* USER SUBMISSION DATA */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3">
          Your Submission Attempt ({totalEntries})
        </h2>

        <Item variant="outline" className="items-start">
          <ItemMedia variant="icon">
            <CircleUser className="mt-1" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Name: {userInput.name}</ItemTitle>
            <ItemTitle>
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

            {allEntries.map((entry: any, index: number) => (
              <ItemDescription key={index} className="flex flex-col mt-2">
                <span>Product Name: {entry.productName}</span>
                <span>Ad Type: {entry.adType}</span>
                <span>Social Post Type: {entry.socialPostType}</span>
                <span>Platform: {entry.platform}</span>
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

      {/* ENTRIES BOOKING DATA (ACCEPT AND FAILED) */}
      <div className="flex gap-5 my-10">
        {/* ACCEPTED BOOKINGS*/}
        <div className="w-1/2">
          <h2 className="font-semibold text-lg mb-3 text-green-600">
            Your Successful Bookings ({entries.success.length})
          </h2>

          <div className="grid gap-4">
            {entries.success.map((accept: any) => (
              <Item variant={"muted"} key={accept.id} className="items-start">
                <ItemMedia variant="icon">
                  <BookmarkCheck className="mt-1" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Product Name: {accept.productName}</ItemTitle>
                  <ItemTitle>Ad Type: {accept.adType}</ItemTitle>
                  <ItemDescription className="flex flex-col mt-2">
                    <span>Social Post Type: {accept.socialPostType}</span>
                    <span>Platform: {accept.platform}</span>
                    <span>
                      Scheduled:{" "}
                      {new Date(accept.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>

        {/* FAILED BOOKINGS */}
        <div className="w-1/2">
          <h2 className="font-semibold text-lg mb-3 text-destructive">
            Your Failed Bookings ({entries.failed.length})
          </h2>

          <div className="grid gap-4">
            {entries.failed.map((reject: any) => (
              <Item variant={"muted"} key={reject.id} className="items-start">
                <ItemMedia variant="icon">
                  <BookmarkX className="mt-1" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Product Name: {reject.productName}</ItemTitle>
                  <ItemTitle>Ad Type: {reject.adType}</ItemTitle>
                  <ItemDescription className="flex flex-col mt-2">
                    <span>Social Post Type: {reject.socialPostType}</span>
                    <span>Platform: {reject.platform}</span>
                    <span>
                      Scheduled:{" "}
                      {new Date(reject.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>

                    <span className="mt-2">Reason: {reject.reason}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>
      </div>

      {/* EXISTING BOOKINGS */}
      {existingBookings.length > 0 && (
        <React.Fragment>
          <h2 className="font-semibold text-lg mb-3">
            Existing Bookings ({existingBookings.length})
          </h2>

          <div className="grid gap-4">
            {existingBookings.map((booking: any) => (
              <Item variant={"muted"} key={booking.row_number}>
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
                    <span>Ad Type: {booking.ad_type}</span>
                    <span>Social Post Type: {booking.social_post_type}</span>
                    <span>Platform: {booking.platform}</span>
                    <span>Scheduled: {booking.date_scheduled}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </React.Fragment>
      )}

      {/* INFORMATION SECTION */}
      <SocialFullyBookedMsg />
    </div>
  );
}
