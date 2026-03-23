// react-router-dom
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// always eager, needed immediately
import Layout from "./layout";
import ErrorPage from "../pages/error/error-page";

// lazy loaded, only fetched when the route is visited
const MainPage = lazy(() => import("../pages/main-page"));
const MainNewsletterPage = lazy(() => import("../pages/newsletter/main"));
const FullyBooked = lazy(() => import("../pages/newsletter/fully-booked"));
const PartiallyBooked = lazy(
  () => import("../pages/newsletter/partially-booked"),
);

// fallback component
import PageLoader from "../components/page-loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "newsletter-booking",
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainNewsletterPage />
          </Suspense>
        ),
      },
      {
        path: "newsletter-booking/fully-booked",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FullyBooked />
          </Suspense>
        ),
      },
      {
        path: "newsletter-booking/partially-booked",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PartiallyBooked />
          </Suspense>
        ),
      },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
