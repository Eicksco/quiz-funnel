"use client";

import { motion } from "framer-motion";
import { useQuizStore, type Goal } from "@/store/useQuizStore";

const goalOptions: {
  value: Goal;
  title: string;
  desc: string;
  tag: string;
  icon: string;
  image: string;
}[] = [
  {
    value: "lose_fat",
    title: "减脂",
    desc: "降低体脂，改善体型线条",
    tag: "燃脂塑形",
    icon: "🔥",
    image: "/images/goals/fat-burn.png",
  },
  {
    value: "build_muscle",
    title: "增肌",
    desc: "提升力量，增加肌肉量",
    tag: "力量进阶",
    icon: "⚡",
    image: "/images/goals/muscle.png",
  },
  {
    value: "shape",
    title: "塑形",
    desc: "改善体态，打造更紧致的身形",
    tag: "体态优化",
    icon: "✨",
    image: "/images/goals/body-shape.png",
  },
];

export function GoalQuestion() {
  const goal = useQuizStore((state) => state.goal);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  function handleSelect(value: Goal) {
    updateField("goal", value);
    setTimeout(() => {
      nextQuestion();
    }, 350);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-start pt-0 md:pt-0"
    >
      <div className="mx-auto mt-8 max-w-4xl text-center md:mt-12">
        <div className="mb-4 text-[18px] font-bold text-[#B8FF3D]">
          /// 目标设定 ///
        </div>

        <h1 className="text-[25px] font-extrabold leading-[1.12] text-white md:text-[46px] md:leading-tight">
          你的主要健身目标是什么？
        </h1>

        <p className="mt-5 text-[14px] leading-relaxed text-white/45 md:text-[20px]">
          我们会根据你的目标调整预测速度和报告重点。
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:gap-7">
        {goalOptions.map((option) => {
          const active = goal === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={[
                "group relative overflow-hidden text-left transition-all duration-300",
                "h-[145px] rounded-[30px] px-7 py-5",
                "md:h-[260px] md:rounded-[34px] md:px-8 md:py-8",
                active
                  ? "bg-[#B8FF3D] text-black shadow-[0_0_34px_rgba(184,255,61,0.35)]"
                  : "border border-white/10 bg-[#171717] text-white hover:-translate-y-1 hover:border-[#B8FF3D]/60 hover:shadow-[0_0_26px_rgba(184,255,61,0.16)]",
              ].join(" ")}
            >
              {active && (
                <div className="absolute right-5 top-5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black text-[18px] font-bold text-[#B8FF3D] md:right-6 md:top-6 md:h-8 md:w-8 md:w-8 md:left-auto">
                  ✓
                </div>
              )}

              <img
                src={option.image}
                alt=""
                className={[
                  "pointer-events-none absolute object-contain transition-all duration-300",
                  option.value === "shape"
                    ? "right-[-18px] bottom-[-22px] h-[138px] md:right-[-35px] md:bottom-[-35px] md:h-[250px]"
                    : option.value === "build_muscle"
                      ? "right-[-3px] top-1/2 h-[105px] -translate-y-1/2 md:right-[-55px] md:h-[210px]"
                      : "right-[-18px] top-1/2 h-[118px] -translate-y-1/2 md:right-[-35px] md:h-[230px]",
                  active
                    ? "opacity-35 scale-105"
                    : "opacity-25 grayscale group-hover:opacity-45 group-hover:grayscale-0 group-hover:scale-105",
                ].join(" ")}
              />

              <div className="relative z-10 flex h-full flex-col justify-center pr-[115px] md:block md:pr-0">
                <h3 className="text-[34px] font-extrabold leading-none tracking-tight md:text-[38px] md:leading-tight">
                  {option.title}
                </h3>

                <p
                  className={[
                    "mt-3 text-[16px] leading-[1.25] md:mt-4 md:text-[17px] md:leading-relaxed",
                    active ? "text-black/65" : "text-white/50",
                  ].join(" ")}
                >
                  {option.desc}
                </p>

                <div
                  className={[
                    "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold leading-none",
                    "md:mt-6 md:gap-2 md:px-3 md:py-1 md:text-sm",
                    active ? "bg-black/10 text-black" : "bg-white/8 text-[#B8FF3D]",
                  ].join(" ")}
                >
                  <span>{option.icon}</span>
                  <span>{option.tag}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
