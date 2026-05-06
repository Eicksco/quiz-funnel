"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import BodyDataVideoBackground from "./BodyDataVideoBackground";

type Props = {
  children: ReactNode;
  stepLabel: string;
};

export default function BodyDataStepLayout({ children, stepLabel }: Props) {
  const prevQuestion = useQuizStore((state) => state.prevQuestion);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <BodyDataVideoBackground />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-4 flex items-center justify-between">
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
