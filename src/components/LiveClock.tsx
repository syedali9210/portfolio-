"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-base text-foreground">
      {time ?? "--:--"} <span className="text-muted-foreground">IST</span>
    </p>
  );
}
