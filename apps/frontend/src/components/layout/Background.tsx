"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DarkVeil from "../ui/DarkVeil";
import LightRays from "../ui/LightRays";

const Background = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0">
        {resolvedTheme === "dark" ? <DarkVeil /> : <LightRays />}
      </div>
    </>
  );
};

export default Background;
