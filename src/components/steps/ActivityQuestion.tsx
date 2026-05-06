"use client";

import { motion } from "framer-motion";
import { useQuizStore, type ActivityLevel } from "@/store/useQuizStore";

const frequencyOptions: {
  value: ActivityLevel;
  title: string;
  level: number;
  label: string;
  icon: "sofa" | "walk" | "run" | "strength";
}[] = [
  {
    value: "rarely",
    title: "几乎不运动",
    level: 1,
    label: "一周0-1次",
    icon: "sofa",
  },
  {
    value: "sometimes",
    title: "偶尔运动",
    level: 2,
    label: "一周1-2次",
    icon: "walk",
  },
  {
    value: "often",
    title: "经常运动",
    level: 3,
    label: "一周3-4次",
    icon: "run",
  },
  {
    value: "active",
    title: "高频运动",
    level: 4,
    label: "一周5次以上",
    icon: "strength",
  },
];

function getIcon(icon: (typeof frequencyOptions)[number]["icon"]) {
  switch (icon) {
    case "sofa":
      return <span className="text-2xl">🛋️</span>;
    case "walk":
      return <span className="text-2xl">🚶</span>;
    case "run":
      return <span className="text-2xl">🏃</span>;
    case "strength":
      return <span className="text-2xl">💪</span>;
    default:
      return null;
  }
}

export default function ActivityQuestion() {
  const activityLevel = useQuizStore((state) => state.activityLevel);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  function handleSelect(value: ActivityLevel) {
    updateField("activityLevel", value);
    setTimeout(() => {
      nextQuestion();
    }, 220);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-start pt-10"
    >
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-medium text-lime-300">运动频率</p>
        <h1 className="text-3xl font-semibold leading-tight">
          你目前的运动频率是？
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/50">
          运动频率会影响预计达成速度和计划强度。
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        {frequencyOptions.map((item) => {
          const selected = activityLevel === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={[
                "group relative flex w-full items-center justify-between rounded-[28px] border px-4 py-2.5 text-left transition-all duration-300 md:px-5 md:py-3.5",
                "bg-white/[0.03] backdrop-blur-sm",
                selected
                  ? "border-lime-400 shadow-[0_0_0_1px_rgba(163,230,53,0.5),0_0_30px_rgba(163,230,53,0.18)]"
                  : "border-white/10 hover:border-lime-400/40 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <div
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border md:h-16 md:w-16",
                    selected
                      ? "border-lime-400/70 text-lime-400"
                      : "border-white/15 text-lime-400",
                  ].join(" ")}
                >
                  {getIcon(item.icon)}
                </div>

                <div className="min-w-0">
                  <div className="text-lg font-extrabold tracking-tight text-white md:text-2xl">
                    {item.title}
                  </div>

                  <div className="mt-2 flex items-center gap-2 md:mt-3 md:gap-3">
                    {Array.from({ length: 4 }).map((_, index) => {
                      const filled = index < item.level;

                      return (
                        <span
                          key={index}
                          className={[
                            "h-3 w-3 rounded-full border md:h-4 md:w-4",
                            filled
                              ? "border-lime-400 bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.55)]"
                              : "border-white/45 bg-transparent",
                          ].join(" ")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="ml-3 flex shrink-0 items-center gap-2 md:ml-4 md:gap-3">
                <span
                  className={[
                    "text-xs font-semibold md:text-lg",
                    selected ? "text-lime-400" : "text-white/80",
                  ].join(" ")}
                >
                  {item.label}
                </span>

                {selected ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-black md:h-10 md:w-10">
                    ✓
                  </span>
                ) : (
                  <span className="text-xl text-white/50 transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                    ›
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
