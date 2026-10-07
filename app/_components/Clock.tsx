"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const clockFormat = new Intl.DateTimeFormat("en-PH", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default function Clock() {
  // Filled in after the page loads so the server and browser render the same HTML.
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(clockFormat.format(new Date()));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex h-12 items-center gap-2 rounded-2xl bg-surface px-4 text-sm font-medium tabular-nums text-ink shadow-card">
      <Icon name="clock" className="h-4.5 w-4.5 text-brand" />
      <span className="min-w-[8.5rem]">{now ?? "--"}</span>
    </span>
  );
}
