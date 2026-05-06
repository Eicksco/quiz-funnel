"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useQuizStore } from "@/store/useQuizStore";

const stepInfo = [
  { label: "基础信息", start: 0, end: 1 },
  { label: "身体数据", start: 2, end: 5 },
  { label: "运动频率", start: 6, end: 6 },
  { label: "分析中", start: 7, end: 7 },
  { label: "报告", start: 8, end: 8 },
];

function getCurrentStage(question: number) {
  return stepInfo.findIndex(
    (step) => question >= step.start && question <= step.end
  );
}

export function QuizShell({ children }: { children: ReactNode }) {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const prevQuestion = useQuizStore((state) => state.prevQuestion);

  const currentStage = getCurrentStage(currentQuestion);
  const stage = stepInfo[currentStage];

  return (
    <main className="min-h-[100svh] bg-[#050505] text-white">
      <div className="flex min-h-[100svh] flex-col">
        <header className="shrink-0 px-6 pt-0 md:pt-1">
          <div className="mx-auto mb-1 flex w-full max-w-6xl items-center justify-between md:mb-2">
            <button
              type="button"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl disabled:opacity-20"
            >
              ←
            </button>

            <div className="text-sm font-semibold">
              Step {currentStage + 1}: {stage?.label}
            </div>

            <div className="h-11 w-11" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl grid-cols-5 gap-1">
            {stepInfo.map((step, index) => {
              const total = step.end - step.start + 1;
              const done = Math.min(
                Math.max(currentQuestion - step.start, 0),
                total
              );
              const width =
                index < currentStage
                  ? 100
                  : index === currentStage
                    ? (done / total) * 100
                    : 0;

              return (
                <div
                  key={step.label}
                  className="h-1 overflow-hidden rounded-full bg-white/15"
                >
                  <motion.div
                    className="h-full rounded-full bg-white"
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              );
            })}
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-0 pb-8 md:max-w-4xl md:pt-0 lg:max-w-6xl lg:pt-2">
          {children}
        </div>
      </div>
    </main>
  );
}
