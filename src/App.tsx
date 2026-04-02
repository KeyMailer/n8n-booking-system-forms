// REACT-ROUTER-DOM
import { RouterProvider } from "react-router-dom";

// LIGHT-DARK MODE CONTEXT
import { ThemeProvider } from "./context/theme-context";

// ROUTES PATHS
import router from "./routes/main-route";

// SHADCN COMPONENTS
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
