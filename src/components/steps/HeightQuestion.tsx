"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";

export default function HeightQuestion() {
  const unitSystem = useQuizStore((state) => state.unitSystem);
  const height = useQuizStore((state) => state.height);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  const heightNumber = Number(height);

  const isMetric = unitSystem === "metric";
  const isValid = isMetric
    ? heightNumber >= 120 && heightNumber <= 230
    : heightNumber >= 48 && heightNumber <= 90;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-start pt-10"
    >
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-medium text-lime-300">身体数据</p>
        <h1 className="text-3xl font-semibold leading-tight">
          你的身高是多少？
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/50">
          身高将用于计算 BMI，并生成更准确的体重变化趋势。
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-full bg-white/[0.06] p-1">
        <button
          type="button"
          onClick={() => {
            updateField("unitSystem", "metric");
            updateField("height", "");
          }}
          className={`h-11 rounded-full text-sm font-semibold transition ${
            isMetric ? "bg-lime-300 text-black" : "text-white/50"
          }`}
        >
          公制 cm/kg
        </button>

        <button
          type="button"
          onClick={() => {
            updateField("unitSystem", "imperial");
            updateField("height", "");
          }}
          className={`h-11 rounded-full text-sm font-semibold transition ${
            !isMetric ? "bg-lime-300 text-black" : "text-white/50"
          }`}
        >
          英制 in/lb
        </button>
      </div>

      <div>
        <div className="relative">
          <input
            value={height}
            onChange={(e) =>
              updateField("height", e.target.value.replace(/\D/g, ""))
            }
            inputMode="numeric"
            placeholder={isMetric ? "例如 165" : "例如 65"}
            className="h-16 w-full rounded-3xl border border-white/10 bg-white/[0.06] px-6 pr-20 text-center text-3xl font-semibold text-white outline-none transition focus:border-lime-300"
          />

          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-white/40">
            {isMetric ? "cm" : "in"}
          </span>
        </div>

        {height && !isValid && (
          <p className="mt-3 text-center text-sm text-red-300">
            {isMetric
              ? "请输入 120 到 230 cm 之间的身高"
              : "请输入 48 到 90 in 之间的身高"}
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
