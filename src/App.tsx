// react-router-dom
import { RouterProvider } from "react-router-dom";

// light-dark mode context
import { ThemeProvider } from "./context/theme-context";

// routes paths
import router from "./routes/main-route";

// shadcn
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
