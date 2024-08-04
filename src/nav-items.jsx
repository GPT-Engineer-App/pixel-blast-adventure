import { Home, Gamepad2 } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Top-Down Shooter",
    to: "/",
    icon: <Gamepad2 className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Home",
    to: "/home",
    icon: <Home className="h-4 w-4" />,
    page: <div className="p-4">Home Page</div>,
  },
];
