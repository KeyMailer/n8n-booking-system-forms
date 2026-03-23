// react
import { useEffect, useState } from "react";

// react-router-dom
import { useNavigate, useLocation } from "react-router-dom";

import FullyBookedMultiMode from "./fully-booked-multi-mode";
import FullyBookedSingleMode from "./fully-booked-single-mode";

// icons
import { MoveLeft } from "lucide-react";

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

  const { userInput } = data;
  const isSingleMode = userInput?.submissionMode === "single";

  // single mode destruct
  const {
    message,
    newsletter,
    existingBookings = [],
  } = isSingleMode ? data : {};

  // multi mode destruct
  const {
    message: multiMessage,
    existingBookings: multiExistingBookings = [],
  } = !isSingleMode ? data : {};

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

      {isSingleMode ? (
        <FullyBookedSingleMode
          newsletter={newsletter}
          message={message}
          existingBookings={existingBookings}
          userInput={userInput}
        />
      ) : (
        <FullyBookedMultiMode
          message={multiMessage}
          existingBookings={multiExistingBookings}
          userInput={userInput}
        />
      )}
    </div>
  );
}
