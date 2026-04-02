// TOOL TYPE FORMAT
export interface Tool {
  name: string;
  description: string;
  path: string;
  available: boolean;
}

// THESE DATA WILL SHOW IN THE MAIN PAGE
export const tools: Tool[] = [
  {
    name: "Newsletter Booking",
    description: "Book multiple newsletter placement in one go.",
    path: "/newsletter-booking",
    available: true,
  },
  {
    name: "Social Booking",
    description: "Book multiple social placements in one go.",
    path: "/social-booking",
    available: false,
  },
];
