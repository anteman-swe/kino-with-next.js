"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toggle } from "@base-ui/react/toggle";
import "./DarkLightTheme.scss";

export default function DarkLightTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="theme-toggle-placeholder" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Toggle
      aria-label="Toggle dark mode"
      pressed={isDark}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      className="theme-toggle-btn"
    >
      {isDark ? (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon sun">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.581 1.58M16.199 16.199l1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.581-1.58M16.199 7.801l1.58-1.58M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ) : (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon moon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </Toggle>
  );
}