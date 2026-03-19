export interface Tool {
  name: string;
  description: string;
  path: string;
}

export const tools: Tool[] = [
  {
    name: "Newsletter Booking",
    description: "Book multiple newsletter placement in one go",
    path: "/newsletter-booking",
  },
];
