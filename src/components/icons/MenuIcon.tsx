"use client";

import React from "react";

export function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
        fill="#1C1C21"
      />
      <path
        d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
        fill="#1C1C21"
      />
      <path
        d="M5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18C20 17.4477 19.5523 17 19 17H5Z"
        fill="#1C1C21"
      />
    </svg>
  );
}
