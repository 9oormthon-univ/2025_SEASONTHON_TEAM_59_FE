// hooks/useViewportHeight.js
import { useEffect, useState } from "react";

export function useViewportHeight() {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const updateVh = () => {
      const visualVh =
        window.visualViewport?.height ?? window.innerHeight;
      setVh(visualVh * 0.01);
      document.documentElement.style.setProperty("--vh", `${visualVh * 0.01}px`);
    };

    updateVh();

    window.addEventListener("resize", updateVh);
    window.visualViewport?.addEventListener("resize", updateVh);

    return () => {
      window.removeEventListener("resize", updateVh);
      window.visualViewport?.removeEventListener("resize", updateVh);
    };
  }, []);

  return vh;
}