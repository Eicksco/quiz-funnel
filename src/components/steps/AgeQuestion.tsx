"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";

export default function AgeQuestion() {
  const age = useQuizStore((state) => state.age);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  const ageNumber = Number(age);
  const isValid = ageNumber >= 12 && ageNumber <= 80;

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
          你的年龄是多少？
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/50">
          年龄会影响代谢估算和预计达标周期。
        </p>
      </div>

      <div className="mb-4">
        <input
          value={age}
          onChange={(e) => updateField("age", e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          placeholder="例如 24"
          className="h-16 w-full rounded-3xl border border-white/10 bg-white/[0.06] px-6 text-center text-3xl font-semibold text-white outline-none transition focus:border-lime-300"
        />

        {age && !isValid && (
          <p className="mt-3 text-center text-sm text-red-300">
            请输入 12 到 80 之间的年龄
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={nextQuestion}
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
