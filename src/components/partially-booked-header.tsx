import { CalendarMinus } from "lucide-react"; // ICON
export default function PartiallyBookedHeader() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center">
      <CalendarMinus size={28} className="text-destructive" />
      <p className="font-bold text-2xl">Partially Booked</p>

      <p className="text-foreground max-w-xl">
        Your request was partially successful. Some bookings were confirmed,
        while others failed due to unavailable slots.
      </p>
    </div>
  );
}
