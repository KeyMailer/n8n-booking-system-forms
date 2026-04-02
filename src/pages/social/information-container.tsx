// REACT
import { useState, useEffect } from "react";

// SHADCN COMPONENTS
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../components/ui/item";

interface TimeEntry {
  time: string;
  day: string;
  offset: string;
}

interface Times {
  ph: TimeEntry;
  london: TimeEntry;
  sa: TimeEntry;
}

function getOffsetFromPHT(tz: string): string {
  const now = new Date();
  const phDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
  );
  const tzDate = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const diff = Math.round((tzDate.getTime() - phDate.getTime()) / 3_600_000);
  if (diff === 0) return "same as PHT";
  return diff > 0 ? `+${diff}h from PHT` : `${diff}h from PHT`;
}

function getDayLabel(tz: string): string {
  const now = new Date();
  const tzDateStr = now.toLocaleDateString("en-US", { timeZone: tz });
  const phDateStr = now.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
  });

  const tzDate = new Date(tzDateStr);
  const phDate = new Date(phDateStr);

  const weekday = now.toLocaleDateString("en-US", {
    timeZone: tz,
    weekday: "long",
  });

  if (tzDate < phDate) return `${weekday} · yesterday`;
  if (tzDate > phDate) return `${weekday} · tomorrow`;
  return `${weekday} · today`;
}

export default function InformationContainer() {
  const [times, setTimes] = useState<Times>({
    ph: { time: "--:--", day: "", offset: "" },
    london: { time: "--:--", day: "", offset: "" },
    sa: { time: "--:--", day: "", offset: "" },
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      const formatTime = (tz: string) =>
        new Date(
          now.toLocaleString("en-US", { timeZone: tz }),
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

      const phDate = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );
      const phWeekday = phDate.toLocaleDateString("en-US", {
        timeZone: "Asia/Manila",
        weekday: "long",
      });

      setTimes({
        ph: {
          time: formatTime("Asia/Manila"),
          day: `${phWeekday} · today`,
          offset: "PHT · UTC+8",
        },
        london: {
          time: formatTime("Europe/London"),
          day: getDayLabel("Europe/London"),
          offset: getOffsetFromPHT("Europe/London"),
        },
        sa: {
          time: formatTime("America/Sao_Paulo"),
          day: getDayLabel("America/Sao_Paulo"),
          offset: getOffsetFromPHT("America/Sao_Paulo"),
        },
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-1/4 lg:sticky lg:top-5 h-fit ml-auto">
      <Item variant={"muted"}>
        <ItemContent>
          <ItemTitle>Quick Note</ItemTitle>
          <ItemDescription className="line-clamp-5">
            • No limit for Bronze ad type, but there is a maximum of 2 bookings
            per day for Silver to Platinum ad types.
          </ItemDescription>
          <ItemDescription className="my-2">
            • Bookings are not allowed from 8:00 PM to 12:00 AM PHT onwards.
          </ItemDescription>
          <ItemDescription className="line-clamp-3">
            • Same day booking is not allowed, except for Bronze ads and image
            post type.
          </ItemDescription>
        </ItemContent>
      </Item>

      <h1 className="mt-5 font-bold text-lg">Time zone difference</h1>
      {/* PHILIPPINES */}
      <Item variant={"outline"} className="mt-2">
        <ItemContent>
          <div className="flex items-center justify-between">
            <div>
              <ItemTitle>Manila</ItemTitle>
              <ItemDescription className="text-2xl font-mono">
                {times.ph.time}
              </ItemDescription>
              <ItemDescription className="text-xs mt-1">
                {times.ph.day}
              </ItemDescription>
            </div>
            <Badge className="bg-chart-1 text-black">{times.ph.offset}</Badge>
          </div>
        </ItemContent>
      </Item>

      {/* LONDON */}
      <Item variant={"outline"} className="mt-2">
        <ItemContent>
          <div className="flex items-center justify-between">
            <div>
              <ItemTitle>London</ItemTitle>
              <ItemDescription className="text-2xl font-mono">
                {times.london.time}
              </ItemDescription>
              <ItemDescription className="text-xs mt-1">
                {times.london.day}
              </ItemDescription>
            </div>
            <Badge variant={"destructive"}>{times.london.offset}</Badge>
          </div>
        </ItemContent>
      </Item>

      {/* EDT (SA) */}
      <Item variant={"outline"} className="mt-2">
        <ItemContent>
          <div className="flex items-center justify-between">
            <div>
              <ItemTitle>Eastern Daylight Time</ItemTitle>
              <ItemDescription className="text-2xl font-mono">
                {times.sa.time}
              </ItemDescription>
              <ItemDescription className="text-xs mt-1">
                {times.sa.day}
              </ItemDescription>
            </div>
            <Badge variant={"destructive"}>{times.sa.offset}</Badge>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
