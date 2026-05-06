"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";

const messages = [
  "正在分析您的 BMI...",
  "正在评估目标体重可达性...",
  "正在生成体重变化趋势...",
  "正在匹配个性化运动建议...",
];

export default function LoadingAnalysis() {
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 3500;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(progressTimer);
      }
    }, 30);

    const messageTimer = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 850);

    const finishTimer = window.setTimeout(() => {
      nextQuestion();
    }, duration);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(messageTimer);
      window.clearTimeout(finishTimer);
    };
  }, [nextQuestion]);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col items-center justify-center text-center"
    >
      <div className="relative mb-10 flex h-36 w-36 items-center justify-center rounded-full bg-lime-300/10">
        <motion.div
          className="absolute inset-0 rounded-full border border-lime-300/40"
          animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0.25, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute h-24 w-24 rounded-full bg-lime-300/20 blur-xl"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative text-4xl font-semibold text-lime-300">
          {Math.round(progress)}%
        </div>
      </div>

      <h1 className="mb-4 text-3xl font-semibold">正在生成你的报告</h1>

      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-sm text-white/50"
      >
        {messages[messageIndex]}
      </motion.p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-lime-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.section>
  );
}
