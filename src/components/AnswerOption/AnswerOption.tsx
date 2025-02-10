"use client";

import React from "react";
import styles from "./AnswerOption.module.css";
import { AnswerOptionShape } from "./AnswerOptionShape";

export enum AnswerState {
  Inactive = "inactive",
  Selected = "selected",
  Correct = "correct",
  Wrong = "wrong",
  None = "none",
}

const AnswerStateColors = {
  [AnswerState.Inactive]: {
    fill: "#FFFFFF",
    stroke: "#D0D0D8",
    sideLines: "#D0D0D8",
    textColor: "#1C1C21",
  },
  [AnswerState.Selected]: {
    fill: "#FFF3EB",
    stroke: "#FF8B37",
    sideLines: "#FF8B37",
    textColor: "#1C1C21",
  },
  [AnswerState.Correct]: {
    fill: "#E6FAEA",
    stroke: "#47D867",
    sideLines: "#47D867",
    textColor: "#1C1C21",
  },
  [AnswerState.Wrong]: {
    fill: "#FDEEED",
    stroke: "#EC6259",
    sideLines: "#EC6259",
    textColor: "#1C1C21",
  },
  [AnswerState.None]: {
    fill: "#FFFFFF",
    stroke: "#D0D0D8",
    sideLines: "#D0D0D8",
    textColor: "#1C1C21",
  },
};

interface AnswerOptionProps {
  letter: string;
  text: string;
  state: AnswerState;
  onClick?: () => void;
}

export function AnswerOption({ letter, text, state, onClick }: AnswerOptionProps) {
  const { fill, stroke, sideLines } = AnswerStateColors[state];

  return (
    <button
      className={`${styles.answerButton} ${styles[state]}`}
      onClick={onClick}
      disabled={state === AnswerState.Inactive}
      type="button"
    >
      <AnswerOptionShape fill={fill} stroke={stroke} sideLines={sideLines} />

      <span className={styles.label}>
        <span className={styles.letter}>{letter}</span>
        <span className={styles.answerText}>{text}</span>
      </span>
    </button>
  );
}
