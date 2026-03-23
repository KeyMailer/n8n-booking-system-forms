// react
import { useEffect } from "react";

// react-router-dom
import { Outlet, useLocation } from "react-router-dom";

// components
import Navbar from "../components/navbar/navbar";

// tools data (displaying in main-page)
import { tools } from "../lib/tools-data";

export default function Layout() {
  const location = useLocation();

  // hide navbar on EVERYTHING except homepage
  const shouldHideNavbar = location.pathname !== "/";

  // change the tab browser title dynamically depends on the route path
  useEffect(() => {
    const currentTool = tools.find((tool) =>
      location.pathname.startsWith(tool.path),
    );
    document.title = currentTool?.name || "Booking Forms";
  }, [location.pathname]);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
