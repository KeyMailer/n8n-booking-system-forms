// REACT
import { useEffect, useState } from "react";

// REACT-ROUTER-DOM
import { useLocation } from "react-router-dom";

// COMPONENTS
import SocialFullyBookedSingleMode from "./fully-booked-single-mode";
import SocialFullyBookedMultiMode from "./fully-booked-multi-mode";
import RedirectIfNoData from "@/components/redirect-if-no-data";
import BookAgain from "@/components/book-again";

export default function SocialFullyBooked() {
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
    const storedData = sessionStorage.getItem("socialFullyBookedData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse socialFullyBookedData", e);
      }

      // REMOVE THE DATA AFTER 10 SECONDS
      const timer = setTimeout(() => {
        sessionStorage.removeItem("socialFullyBookedData");
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

  const isSingleMode = data?.userInput.submissionMode === "single";

  // single mode destruct
  const {
    userInput = {},
    existingBookings = [],
    entry = {},
  } = isSingleMode ? data : {};

  // multi mode destruct
  const {
    userInput: multiUserInput = {},
    existingBookings: multiExistingBookings = [],
    entries = { success: [], failed: [] },
  } = !isSingleMode ? data : {};

  return (
    <div className="p-5 mx-auto 2xl:max-w-5xl">
      {/* BACK TO SOCIAL BOOKING */}
      <BookAgain to="/social-booking" />

      {isSingleMode ? (
        <SocialFullyBookedSingleMode
          userInput={userInput}
          existingBookings={existingBookings}
          entry={entry}
        />
      ) : (
        <SocialFullyBookedMultiMode
          userInput={multiUserInput}
          existingBookings={multiExistingBookings}
          entries={entries}
        />
      )}
    </div>
  );
}
