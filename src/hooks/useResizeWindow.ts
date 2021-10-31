import { useCallback, useEffect, useState } from "react";

const useResizeWindow = () => {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const onResize = useCallback(() => {
    const { innerHeight, innerWidth } = window;

    setSize({ height: innerHeight, width: innerWidth });
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
