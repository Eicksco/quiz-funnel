"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";

export default function WeightQuestion() {
  const unitSystem = useQuizStore((state) => state.unitSystem);
  const weight = useQuizStore((state) => state.weight);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  const isMetric = unitSystem === "metric";
  const weightNumber = Number(weight);

  const isValid = isMetric
    ? weightNumber >= 30 && weightNumber <= 250
    : weightNumber >= 66 && weightNumber <= 550;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-start pt-10"
    >
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium text-lime-300">身体数据</p>
        <h1 className="text-3xl font-semibold leading-tight">
          你当前的体重是多少？
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/50">
          我们会基于当前体重和目标体重生成变化趋势。
        </p>
      </div>

      <div>
        <div className="relative">
          <input
            value={weight}
            onChange={(e) =>
              updateField("weight", e.target.value.replace(/[^\d.]/g, ""))
            }
            inputMode="decimal"
            placeholder={isMetric ? "例如 60" : "例如 132"}
            className="h-16 w-full rounded-3xl border border-white/10 bg-white/[0.06] px-6 pr-20 text-center text-3xl font-semibold text-white outline-none transition focus:border-lime-300"
          />

          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-white/40">
            {isMetric ? "kg" : "lb"}
          </span>
        </div>

        {weight && !isValid && (
          <p className="mt-3 text-center text-sm text-red-300">
            {isMetric
              ? "请输入 30 到 250 kg 之间的体重"
              : "请输入 66 到 550 lb 之间的体重"}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={() => {
          if (!isValid) return;
          setTimeout(() => {
            nextQuestion();
          }, 400);
        }}
        className={`mt-8 h-14 w-full rounded-full text-base font-semibold transition-all ${
          isValid
            ? "bg-lime-300 text-black hover:scale-[1.02] active:scale-[0.98]"
            : "bg-white/10 text-white/30 cursor-not-allowed"
        }`}
      >
        继续
      </button>
    </motion.section>
  );
}
