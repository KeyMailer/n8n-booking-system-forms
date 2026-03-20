// react-router-dom
import { createBrowserRouter } from "react-router-dom";

// pages
import Layout from "./layout";
import MainPage from "../pages/main-page";
import ErrorPage from "../pages/error/error-page";
import MainNewsletterPage from "../pages/newsletter/main";
import FullyBooked from "../pages/newsletter/fully-booked";
import PartiallyBooked from "../pages/newsletter/partially-booked";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: MainPage },
      { path: "newsletter-booking", Component: MainNewsletterPage },
      { path: "newsletter-booking/fully-booked", Component: FullyBooked },
      {
        path: "newsletter-booking/partially-booked",
        Component: PartiallyBooked,
      },

      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
