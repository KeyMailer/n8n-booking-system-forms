import { Outlet, useLocation } from "react-router-dom";

// components
import Navbar from "../components/navbar/navbar";

export default function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/newsletter-booking/fully-booked",
    "/newsletter-booking/partially-booked",
  ];

  // hide the navbar if the route path is similar to data from hideNavbarRoutes
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
