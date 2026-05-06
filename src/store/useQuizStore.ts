import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Gender = "male" | "female" | "";
export type Goal = "lose_fat" | "build_muscle" | "shape" | "";
export type UnitSystem = "metric" | "imperial";
export type ActivityLevel = "rarely" | "sometimes" | "often" | "active" | "";

type QuizData = {
  gender: Gender;
  goal: Goal;
  unitSystem: UnitSystem;
  age: string;
  height: string;
  weight: string;
  targetWeight: string;
  activityLevel: ActivityLevel;
};

type QuizState = QuizData & {
  currentQuestion: number;

  nextQuestion: () => void;
  prevQuestion: () => void;

  updateField: <K extends keyof QuizData>(
    key: K,
    value: QuizData[K]
  ) => void;

  resetQuiz: () => void;
};

const initialData: QuizData = {
  gender: "",
  goal: "",
  unitSystem: "metric",
  age: "",
  height: "",
  weight: "",
  targetWeight: "",
  activityLevel: "",
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuestion: 0,

      ...initialData,

      nextQuestion: () =>
        set((state) => ({
          currentQuestion: Math.min(state.currentQuestion + 1, 8),
        })),

      prevQuestion: () =>
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 0),
        })),

      updateField: (key, value) =>
        set(() => ({
          [key]: value,
        })),

      resetQuiz: () =>
        set({
          currentQuestion: 0,
          ...initialData,
        }),
    }),
    {
      name: "quiz-funnel-storage",
      version: 4,
      migrate: () => ({
        currentQuestion: 0,
        ...initialData,
      }),
    }
  )
);