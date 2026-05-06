"use client";

import { motion } from "framer-motion";
import { useQuizStore, type Gender, type Goal } from "@/store/useQuizStore";

const genderOptions: { label: string; value: Gender; emoji: string }[] = [
  { label: "Female", value: "female", emoji: "♀" },
  { label: "Male", value: "male", emoji: "♂" },
];

const goalOptions: { label: string; value: Goal; desc: string }[] = [
  { label: "Lose Fat", value: "lose_fat", desc: "Burn calories and slim down" },
  { label: "Build Muscle", value: "build_muscle", desc: "Gain strength and tone" },
  { label: "Get Shaped", value: "shape", desc: "Improve curves and posture" },
];

export default function Step1BasicInfo() {
  const gender = useQuizStore((state) => state.gender);
  const goal = useQuizStore((state) => state.goal);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  const canContinue = Boolean(gender && goal);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-between py-8"
    >
      <div>
        <p className="text-sm text-white/50 mb-3">Step 1 of 5</p>

        <h1 className="text-3xl font-semibold leading-tight mb-3">
          Let&apos;s personalize your fitness plan
        </h1>

        <p className="text-white/60 text-base mb-8">
          Answer a few quick questions so we can estimate your progress.
        </p>

        <div className="mb-8">
          <h2 className="text-sm font-medium text-white/70 mb-3">
            Choose your gender
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((item) => {
              const selected = gender === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateField("gender", item.value)}
                  className={`rounded-3xl border p-5 text-left transition-all ${
                    selected
                      ? "border-lime-300 bg-lime-300 text-black shadow-lg shadow-lime-300/20"
                      : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
                  }`}
                >
                  <div className="text-3xl mb-5">{item.emoji}</div>
                  <div className="text-lg font-semibold">{item.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/70 mb-3">
            What&apos;s your main goal?
          </h2>

          <div className="space-y-3">
            {goalOptions.map((item) => {
              const selected = goal === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateField("goal", item.value)}
                  className={`w-full rounded-3xl border p-5 text-left transition-all ${
                    selected
                      ? "border-lime-300 bg-lime-300 text-black shadow-lg shadow-lime-300/20"
                      : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
                  }`}
                >
                  <div className="font-semibold text-lg">{item.label}</div>
                  <div
                    className={`text-sm mt-1 ${
                      selected ? "text-black/60" : "text-white/45"
                    }`}
                  >
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => nextQuestion()}
        className={`mt-8 h-14 w-full rounded-full text-base font-semibold transition-all ${
          canContinue
            ? "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"
            : "bg-white/10 text-white/30 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </motion.section>
  );
}