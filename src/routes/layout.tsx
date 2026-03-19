import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/navbar/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
