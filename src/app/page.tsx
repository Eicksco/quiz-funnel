"use client";

import { QuizShell } from "@/components/quiz/QuizShell";
import BodyDataStepLayout from "@/components/quiz/BodyDataStepLayout";
import AgeQuestion from "@/components/steps/AgeQuestion";
import HeightQuestion from "@/components/steps/HeightQuestion";
import WeightQuestion from "@/components/steps/WeightQuestion";
import TargetWeightQuestion from "@/components/steps/TargetWeightQuestion";
import ActivityQuestion from "@/components/steps/ActivityQuestion";
import LoadingAnalysis from "@/components/steps/LoadingAnalysis";
import ResultReport from "@/components/steps/ResultReport";
import { GenderQuestion } from "@/components/steps/GenderQuestion";
import { GoalQuestion } from "@/components/steps/GoalQuestion";
import { useQuizStore } from "@/store/useQuizStore";

export default function Home() {
  const q = useQuizStore((state) => state.currentQuestion);

  if (q >= 2 && q <= 5) {
    return (
      <BodyDataStepLayout stepLabel="Step 2: 身体数据">
        {q === 2 && <AgeQuestion />}
        {q === 3 && <HeightQuestion />}
        {q === 4 && <WeightQuestion />}
        {q === 5 && <TargetWeightQuestion />}
      </BodyDataStepLayout>
    );
  }

  return (
    <QuizShell>
      {q === 0 && <GenderQuestion />}
      {q === 1 && <GoalQuestion />}
      {q === 6 && <ActivityQuestion />}
      {q === 7 && <LoadingAnalysis />}
      {q === 8 && <ResultReport />}
    </QuizShell>
  );
}
