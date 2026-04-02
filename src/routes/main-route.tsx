// REACT
import { lazy, Suspense } from "react";

// REACT-ROUTER-DOM
import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import ErrorPage from "../pages/error/error-page";

// MAIN PAGE
const MainPage = lazy(() => import("../pages/main-page"));

// NEWSLETTER
const MainNewsletterPage = lazy(() => import("../pages/newsletter/main"));
const FullyBooked = lazy(() => import("../pages/newsletter/fully-booked"));
const PartiallyBooked = lazy(
  () => import("../pages/newsletter/partially-booked"),
);

// SOCIAL
const MainSocialPage = lazy(() => import("../pages/social/main"));
const SocialFullyBooked = lazy(() => import("../pages/social/fully-booked"));
const SocialPartiallyBooked = lazy(
  () => import("../pages/social/partially-booked"),
);

// FALLBACK LOADING COMPONENTS
import PageLoader from "../components/page-loader";
import FormSkeleton from "@/components/form-skeleton";
import MainSkeleton from "@/components/main-skeleton";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<MainSkeleton />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "newsletter-booking",
        element: (
          <Suspense fallback={<FormSkeleton />}>
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

      {
        path: "social-booking",
        element: (
          <Suspense fallback={<FormSkeleton />}>
            <MainSocialPage />
          </Suspense>
        ),
      },

      {
        path: "social-booking/fully-booked",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SocialFullyBooked />
          </Suspense>
        ),
      },

      {
        path: "social-booking/partially-booked",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SocialPartiallyBooked />
          </Suspense>
        ),
      },

      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
