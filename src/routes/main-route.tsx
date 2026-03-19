// react-router-dom
import { createBrowserRouter } from "react-router-dom";

// pages
import Layout from "./layout";
import MainPage from "../pages/main-page";
import ErrorPage from "../pages/error/error-page";
import MainNewsletterPage from "../pages/newsletter/main";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: MainPage },
      { path: "newsletter-booking", Component: MainNewsletterPage },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
