import { useEffect, useState } from "react";

/**
 * @description A custom hook that returns the window's width and height
 * @returns {width: number, height: number}
 * @author quyn2904
 * @version 1.0
 */

const useWindowSize = () => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setState({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return state;
};

export default useWindowSize;
