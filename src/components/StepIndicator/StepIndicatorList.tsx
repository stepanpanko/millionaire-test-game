"use client";

import React from "react";
import { StepIndicator, StepState } from "@/components/StepIndicator/StepIndicator";
import styles from "./StepIndicatorList.module.css";

interface Question {
  prize: number;
}

interface StepIndicatorListProps {
  finishedSteps: number[];
  currentStep: number;
  questions: Question[];
}

export function StepIndicatorList({
  finishedSteps,
  currentStep,
  questions,
}: StepIndicatorListProps) {
  const reversedQuestions = questions.slice().reverse();

  return (
    <div className={styles.stepIndicatorList}>
      {reversedQuestions.map((question, reversedIndex) => {
        const originalIndex = questions.length - 1 - reversedIndex;
        let state: StepState = StepState.Inactive;
        if (finishedSteps.includes(originalIndex)) {
          state = StepState.Finished;
        } else if (originalIndex === currentStep) {
          state = StepState.Current;
        }
        return (
          <StepIndicator
            key={originalIndex}
            label={`$${question.prize.toLocaleString()}`}
            state={state}
          />
        );
      })}
    </div>
  );
}
