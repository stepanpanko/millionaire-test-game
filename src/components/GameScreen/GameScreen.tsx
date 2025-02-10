"use client";

import React from "react";
import { AnswerOption } from "@/components/AnswerOption/AnswerOption";
import styles from "./GameScreen.module.css";
import { StepIndicatorList } from "../StepIndicator/StepIndicatorList";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuIcon } from "../icons/MenuIcon";
import type { Question, Option } from "@/hooks/useGameLogic";
import type { AnswerState as AnswerStateType } from "@/components/AnswerOption/AnswerOption";

interface GameScreenProps {
  gameLogic: {
    currentQuestion: Question;
    currentQuestionIndex: number;
    finishedSteps: number[];
    isMenuOpen: boolean;
    questions: Question[];
    handleAnswerClick: (answer: string) => void;
    computeAnswerState: (option: Option) => AnswerStateType;
    toggleMenu: (isOpen: boolean) => void;
  };
}

export function GameScreen({ gameLogic }: GameScreenProps) {
  const {
    currentQuestion,
    currentQuestionIndex,
    finishedSteps,
    isMenuOpen,
    questions,
    handleAnswerClick,
    computeAnswerState,
    toggleMenu,
  } = gameLogic;

  return (
    <div className={styles.gameContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.questionContainer}>
          <span>{currentQuestion.text}</span>
        </div>
        <div
          className={`${styles.answerOptions} ${
            currentQuestion.options.length % 2 !== 0 ? styles.odd : ""
          }`}
        >
          {currentQuestion.options.map(({ id, text, isCorrect }) => {
            const letter = id.toUpperCase();
            const answerState = computeAnswerState({ id, text, isCorrect });
            return (
              <AnswerOption
                key={id}
                letter={letter}
                text={text}
                state={answerState}
                onClick={() => handleAnswerClick(text)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.stepIndicatorContainer}>
        <StepIndicatorList
          finishedSteps={finishedSteps}
          currentStep={currentQuestionIndex}
          questions={questions}
        />
      </div>
      <button className={styles.menuButton} onClick={() => toggleMenu(true)}>
        <MenuIcon />
      </button>
      {isMenuOpen && (
        <div className={styles.menuOverlay}>
          <div className={styles.overlayHeader}>
            <button className={styles.closeButton} onClick={() => toggleMenu(false)}>
              <CloseIcon />
            </button>
          </div>
          <StepIndicatorList
            finishedSteps={finishedSteps}
            currentStep={currentQuestionIndex}
            questions={questions}
          />
        </div>
      )}
    </div>
  );
}
