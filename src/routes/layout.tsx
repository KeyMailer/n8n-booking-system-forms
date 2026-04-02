// REACT
import { useEffect } from "react";

// REACT-ROUTER-DOM
import { Outlet, useLocation } from "react-router-dom";

// COMPONENTS
import Navbar from "../components/navbar/navbar";
import Footer from "@/components/footer/footer";

// TOOLS DATA
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
    document.title = currentTool?.name || "KM - n8n Webhooks";
  }, [location.pathname]);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      {!shouldHideNavbar && <Footer />}
    </>
  );
}
