"use client";

import { useState, useEffect } from "react";

/**
 * Optimized hook for responsive design using CSS media queries
 * Uses immediate synchronous check to prevent layout delays
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with immediate check to prevent hydration mismatch
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Immediate sync to current state
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use the modern addEventListener if available, fallback to legacy
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // Legacy support for older browsers
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

// Optimized common breakpoint hooks with immediate evaluation
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Immediate check
    checkMobile();

    // Throttled resize listener for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 16); // ~60fps
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
};

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      return width >= 768 && width < 1200;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1200);
    };

    // Immediate check
    checkTablet();

    // Throttled resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkTablet, 16);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isTablet;
};

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1200;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    // Immediate check
    checkDesktop();

    // Throttled resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDesktop, 16);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isDesktop;
};
