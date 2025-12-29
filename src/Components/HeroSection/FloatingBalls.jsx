"use client";
//imports
import React from "react";
//Floationg balls comp
const FloatingBalls = () => {
  const balls = React.useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const size = 5 + Math.random() * 10;
      const style = {
        position: "absolute",
        borderRadius: "9999px",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        pointerEvents: "none",
        userSelect: "none",
      };
      return <div key={i} style={style} />;
    });
  }, []);

  return <>{balls}</>;
};

export default FloatingBalls;
