"use client";

import { useReducer, useCallback } from "react";
import questionsData from "@/config/questions.json";
import { AnswerState } from "@/components/AnswerOption/AnswerOption";

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type QuestionType = "single" | "multi";

export interface Question {
  id: number;
  step: number;
  text: string;
  options: Option[];
  prize: number;
  type?: QuestionType;
}

interface GameState {
  currentQuestionIndex: number;
  selectedAnswers: string[];
  wrongAnswer: string | null;
  totalPrize: number;
  isGameOver: boolean;
  finishedSteps: number[];
  isMenuOpen: boolean;
}

type GameAction =
  | { type: "selectAnswer"; answer: string; isCorrect: boolean }
  | { type: "advanceQuestion"; prize: number }
  | { type: "setGameOver" }
  | { type: "toggleMenu"; isOpen: boolean };

const initialState: GameState = {
  currentQuestionIndex: 0,
  selectedAnswers: [],
  wrongAnswer: null,
  totalPrize: 0,
  isGameOver: false,
  finishedSteps: [],
  isMenuOpen: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "selectAnswer":
      if (!action.isCorrect) {
        return { ...state, wrongAnswer: action.answer };
      }
      return { ...state, selectedAnswers: [...state.selectedAnswers, action.answer] };
    case "advanceQuestion":
      return {
        ...state,
        totalPrize: action.prize,
        finishedSteps: [...state.finishedSteps, state.currentQuestionIndex],
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswers: [],
        wrongAnswer: null,
      };
    case "setGameOver":
      return { ...state, isGameOver: true };
    case "toggleMenu":
      return { ...state, isMenuOpen: action.isOpen };
    default:
      return state;
  }
}

export function useGameLogic() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const questions: Question[] = questionsData.questions as Question[];
  const currentQuestion =
    state.currentQuestionIndex < questions.length
      ? questions[state.currentQuestionIndex]
      : questions[questions.length - 1];
  const correctAnswers = currentQuestion.options
    .filter((opt) => opt.isCorrect)
    .map((opt) => opt.text);
  const questionType: QuestionType =
    currentQuestion.type === "multi" ? "multi" : "single";

  const handleAnswerClick = useCallback(
    (answer: string) => {
      if (state.selectedAnswers.includes(answer) || state.wrongAnswer) return;
      const option = currentQuestion.options.find((opt) => opt.text === answer);
      if (!option) return;
      if (!option.isCorrect) {
        dispatch({ type: "selectAnswer", answer, isCorrect: false });
        setTimeout(() => {
          dispatch({ type: "setGameOver" });
        }, 1000);
        return;
      }
      const newSelected = [...state.selectedAnswers, answer];
      dispatch({ type: "selectAnswer", answer, isCorrect: true });
      if (questionType === "single") {
        setTimeout(() => {
          if (state.currentQuestionIndex + 1 < questions.length) {
            dispatch({ type: "advanceQuestion", prize: currentQuestion.prize });
          } else {
            dispatch({ type: "advanceQuestion", prize: currentQuestion.prize });
            dispatch({ type: "setGameOver" });
          }
        }, 1000);
      } else if (questionType === "multi") {
        if (newSelected.length === correctAnswers.length) {
          setTimeout(() => {
            if (state.currentQuestionIndex + 1 < questions.length) {
              dispatch({ type: "advanceQuestion", prize: currentQuestion.prize });
            } else {
              dispatch({ type: "advanceQuestion", prize: currentQuestion.prize });
              dispatch({ type: "setGameOver" });
            }
          }, 1000);
        }
      }
    },
    [
      state.selectedAnswers,
      state.wrongAnswer,
      state.currentQuestionIndex,
      currentQuestion,
      correctAnswers.length,
      questions.length,
      questionType,
    ]
  );

  const computeAnswerState = useCallback(
    (option: Option): AnswerState => {
      if (state.wrongAnswer) {
        return option.text === state.wrongAnswer
          ? AnswerState.Wrong
          : option.isCorrect
          ? AnswerState.Correct
          : AnswerState.Inactive;
      }
      const correctOptionTexts = currentQuestion.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.text);
      const isComplete = state.selectedAnswers.length === correctOptionTexts.length;
      if (isComplete) {
        return option.isCorrect ? AnswerState.Correct : AnswerState.Inactive;
      }
      if (state.selectedAnswers.includes(option.text)) {
        return AnswerState.Selected;
      }
      return AnswerState.None;
    },
    [state.wrongAnswer, state.selectedAnswers, currentQuestion]
  );

  const toggleMenu = useCallback((isOpen: boolean) => {
    dispatch({ type: "toggleMenu", isOpen });
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalPrize: state.totalPrize,
    isGameOver: state.isGameOver,
    finishedSteps: state.finishedSteps,
    isMenuOpen: state.isMenuOpen,
    questions,
    handleAnswerClick,
    computeAnswerState,
    toggleMenu,
  };
}
