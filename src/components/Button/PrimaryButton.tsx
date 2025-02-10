"use client";

import React, { useState } from "react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
}

export function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={`${styles.primaryButton} ${isPressed ? styles.pressed : ""}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

