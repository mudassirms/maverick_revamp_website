import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router swaps page content in place without a real browser
// navigation, so the browser never resets scroll position on its own.
// This listens for pathname changes and jumps back to the top each time.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;