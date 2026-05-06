"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import BodyDataVideoBackground from "./BodyDataVideoBackground";

type Props = {
  children: ReactNode;
  stepLabel: string;
};

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

export default function BodyDataStepLayout({ children, stepLabel }: Props) {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const prevQuestion = useQuizStore((state) => state.prevQuestion);

  const currentStage = getCurrentStage(currentQuestion);
  const stage = stepInfo[currentStage];

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <BodyDataVideoBackground />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <button
              type="button"
              onClick={prevQuestion}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl backdrop-blur-md"
            >
              ←
            </button>

            <div className="text-sm font-bold sm:text-base">{stepLabel}</div>

            <div className="h-12 w-12" />
          </div>

          <div className="grid w-full grid-cols-5 gap-1">
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
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-start pt-4"
        >
          {children}
        </motion.section>
      </div>
    </main>
  );
}
