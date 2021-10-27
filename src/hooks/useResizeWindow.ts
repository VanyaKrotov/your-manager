import { useCallback, useEffect, useState } from "react";

const useResizeWindow = () => {
  const [size, setSize] = useState({
    height: window.screen.height,
    width: window.screen.width,
  });

  const onResize = useCallback(() => {
    const { width, height } = window.screen;

    setSize({ height, width });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return size;
};

export default useResizeWindow;
