"use client";

import React from "react";
import styles from "./StepIndicator.module.css";

export enum StepState {
  Current = "current",
  Inactive = "inactive",
  Finished = "finished"
}

const StepStateColors = {
  [StepState.Current]: { fill: "#FFF3EB", stroke: "#FF8B37", textColor: "#FF8B37" },
  [StepState.Inactive]: { fill: "#FFFFFF", stroke: "#D0D0D8", textColor: "#1C1C21" },
  [StepState.Finished]: { fill: "#FFFFFF", stroke: "#D0D0D8", textColor: "#D0D0D8" }
};

interface StepIndicatorProps {
  label: string;
  state: StepState;
}

export function StepIndicator({ label, state }: StepIndicatorProps) {
  const { fill, stroke, textColor } = StepStateColors[state];

  return (
    <div className={styles.stepContainer}>
      <svg
        width="376"
        height="40"
        viewBox="0 0 376 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M69 20H0" stroke={stroke} />
        <path d="M376 20H307" stroke={stroke} />
        <path
          d="M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z"
          fill={fill}
          stroke={stroke}
        />
      </svg>
      <span className={styles.stepLabel} style={{ color: textColor }}>
        {label}
      </span>
    </div>
  );
}
