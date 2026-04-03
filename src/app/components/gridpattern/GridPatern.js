"use client";

import React from "react";
import styles from "./grid.module.css";

export default function GridBackground({ width = 40, height = 40, strokeDasharray = "4 4" }) {
  const id = React.useId();

  return (
    <svg
      className={styles.grid}
      aria-hidden="true"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} strokeWidth="0" />
    </svg>
  );
}