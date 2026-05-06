"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateReport } from "@/lib/calc";
import { useQuizStore } from "@/store/useQuizStore";

function formatNumber(value: number, digits = 1) {
  if (!Number.isFinite(value)) return "--";
  return Number(value.toFixed(digits)).toString();
}

function calculateBMI({
  height,
  weight,
  unitSystem,
}: {
  height: number;
  weight: number;
  unitSystem: string;
}) {
  if (!height || !weight) return 22;

  if (unitSystem === "metric") {
    // metric: height = cm, weight = kg
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }

  // imperial: height = inch, weight = lb
  return (weight / (height * height)) * 703;
}

function getBMIStatus(bmi: number) {
  if (bmi < 18.5) return "偏瘦";
  if (bmi < 25) return "正常";
  if (bmi < 30) return "超重";
  return "肥胖";
}

function getBMIAdvice(bmi: number) {
  if (bmi < 18.5) {
    return "你的 BMI 处于偏瘦范围，建议优先关注力量训练、营养摄入与健康增重。";
  }

  if (bmi < 25) {
    return "你的 BMI 处于理想区间，建议优先关注减脂塑形与训练规律性。";
  }

  if (bmi < 30) {
    return "你的 BMI 略高于理想区间，建议以规律训练、饮食控制和体脂管理为重点。";
  }

  return "你的 BMI 处于较高范围，建议循序渐进降低体重，并优先建立稳定的运动习惯。";
}

function BMIAxis({ bmi }: { bmi: number }) {
  const min = 15;
  const max = 40;

  const clamp = (value: number, minValue: number, maxValue: number) =>
    Math.min(Math.max(value, minValue), maxValue);

  const displayBMI = Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : 22;
  const percent = ((clamp(displayBMI, min, max) - min) / (max - min)) * 100;
  const status = getBMIStatus(displayBMI);
  const advice = getBMIAdvice(displayBMI);

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-5 shadow-[0_0_35px_rgba(163,255,18,0.05)] md:px-6 md:py-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-extrabold text-white md:text-xl">
          BMI 身体质量指数
        </h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-xs text-white/60">
          i
        </span>
      </div>

      <div className="mt-9">
        <div className="mb-5 flex justify-between px-1 text-xs text-white/75 md:text-sm">
          <span>15</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>

        <div className="relative px-1">
          <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-400 via-lime-300 via-yellow-300 to-red-400 md:h-4">
            {[18.5, 25, 30].map((value) => {
              const left = ((value - min) / (max - min)) * 100;
              return (
                <span
                  key={value}
                  className="absolute top-1/2 h-10 w-px -translate-y-1/2 bg-white/25"
                  style={{ left: `${left}%` }}
                />
              );
            })}

            <div
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-white bg-lime-300 shadow-[0_0_18px_rgba(163,255,18,0.8)]"
              style={{ left: `${percent}%` }}
            />
          </div>

          <div className="mt-7 grid grid-cols-4 text-center text-xs text-white/60 md:text-sm">
            <span className={status === "偏瘦" ? "font-semibold text-lime-300" : ""}>
              偏瘦
            </span>
            <span className={status === "正常" ? "font-semibold text-lime-300" : ""}>
              正常
            </span>
            <span className={status === "超重" ? "font-semibold text-lime-300" : ""}>
              超重
            </span>
            <span className={status === "肥胖" ? "font-semibold text-lime-300" : ""}>
              肥胖
            </span>
          </div>

          <div
            className="mt-4 w-fit -translate-x-1/2 rounded-xl border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold text-white shadow-[0_0_16px_rgba(163,255,18,0.08)] backdrop-blur-md md:text-sm"
            style={{ marginLeft: `${percent}%` }}
          >
            BMI {formatNumber(displayBMI, 1)}
            <span className="ml-2 rounded-full bg-lime-300/15 px-2 py-0.5 text-xs text-lime-300">
              {status}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-auto pt-8 text-sm leading-relaxed text-white/70">
        {advice.includes("理想区间") ? (
          <>
            你的 BMI 处于
            <span className="mx-1 font-semibold text-lime-300">理想区间</span>
            ，建议优先关注减脂塑形与训练规律性。
          </>
        ) : (
          advice
        )}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  desc,
  icon,
}: {
  label: string;
  value: string;
  desc: string;
  icon: "bmi" | "calendar";
}) {
  const Icon = icon === "calendar" ? "📅" : "⚖️";

  return (
    <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_30px_rgba(163,255,18,0.04)] md:gap-5 md:p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-lime-300/35 bg-lime-300/5 text-2xl text-lime-300 md:h-16 md:w-16 md:text-3xl">
        {Icon}
      </div>

      <div>
        <p className="text-sm text-white/55 md:text-base">{label}</p>
        <p className="mt-1 text-3xl font-extrabold text-white md:text-4xl">
          {value}
        </p>
        <p className="mt-1 text-sm font-semibold text-lime-300">{desc}</p>
      </div>
    </div>
  );
}

function BottomMetric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-4 border-t border-white/10 px-6 py-6 md:border-t-0 md:border-r last:md:border-r-0">
      <div>
        <p className="text-sm text-white/50">{label}</p>
        <p className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
          {value}
          {unit && <span className="ml-1 text-lg text-white/80">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

function WeightTrendChart({
  trend,
  unit,
  expectedLoss,
}: {
  trend: Array<{ week: string; weight: number }>;
  unit: string;
  expectedLoss: number;
}) {
  const weights = trend.map((item) => item.weight).filter(Number.isFinite);
  const minWeight = weights.length ? Math.min(...weights) : 48;
  const maxWeight = weights.length ? Math.max(...weights) : 60;

  const yMin = Math.floor((minWeight - 2) / 3) * 3;
  const yMax = Math.ceil((maxWeight + 2) / 3) * 3;

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-black/45 p-4 shadow-[0_0_30px_rgba(163,255,18,0.04)] md:p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white md:text-xl">
            体重变化趋势
          </h2>
          <p className="mt-1 text-sm text-white/45">单位：{unit}</p>
        </div>

        <div className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-sm font-semibold text-lime-300">
          预计减重 {formatNumber(expectedLoss, 1)} {unit}
        </div>
      </div>

      <div className="h-[220px] md:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bef264" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#bef264" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 8"
            />

            <XAxis
              dataKey="week"
              stroke="rgba(255,255,255,0.45)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[yMin, yMax]}
              stroke="rgba(255,255,255,0.45)"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ stroke: "rgba(190, 242, 100, 0.25)", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.82)",
                border: "1px solid rgba(190, 242, 100, 0.35)",
                borderRadius: "12px",
                color: "#bef264",
                boxShadow: "0 0 18px rgba(163,255,18,0.18)",
              }}
              labelStyle={{ color: "#bef264" }}
              itemStyle={{ color: "#bef264" }}
            />

            <Area
              type="monotone"
              dataKey="weight"
              stroke="#bef264"
              strokeWidth={3}
              fill="url(#trendFill)"
              dot={{
                r: 4,
                strokeWidth: 2,
                stroke: "#bef264",
                fill: "#050505",
              }}
              activeDot={{
                r: 7,
                strokeWidth: 2,
                stroke: "#bef264",
                fill: "#bef264",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function ResultReport() {
  const [showPricing, setShowPricing] = useState(false);

  const unitSystem = useQuizStore((state) => state.unitSystem);
  const height = useQuizStore((state) => state.height);
  const weight = useQuizStore((state) => state.weight);
  const targetWeight = useQuizStore((state) => state.targetWeight);
  const activityLevel = useQuizStore((state) => state.activityLevel);
  const goal = useQuizStore((state) => state.goal);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const report = calculateReport({
    unitSystem,
    height,
    weight,
    targetWeight,
    activityLevel,
    goal,
  });

  const unit = unitSystem === "metric" ? "kg" : "lb";

  const currentBMI = calculateBMI({
    height: Number(height),
    weight: Number(weight),
    unitSystem,
  });

  const currentWeight = Number(weight) || 58;
  const finalTargetWeight = Number(targetWeight) || 52;
  const expectedLoss = Math.max(currentWeight - finalTargetWeight, 0);

  const bmiStatus = getBMIStatus(currentBMI);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pb-8"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-lime-300">
            你的专属报告已生成
          </p>

          <h1 className="text-3xl font-semibold leading-tight md:text-5xl md:font-extrabold">
            预计 7月8日 达成目标
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50 md:mt-5 md:text-lg">
            根据你的身体数据和运动频率，我们为你生成了初步体重趋势预测。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SummaryCard
            icon="bmi"
            label="当前 BMI"
            value={formatNumber(currentBMI, 1)}
            desc={`${bmiStatus}范围`}
          />

          <SummaryCard
            icon="calendar"
            label="预计周期"
            value="9 周"
            desc="循序渐进"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BMIAxis bmi={currentBMI} />

          <WeightTrendChart
            trend={report.trend}
            unit={unit}
            expectedLoss={expectedLoss}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] md:grid-cols-3">
          <BottomMetric
            label="当前体重"
            value={formatNumber(currentWeight, 1)}
            unit={unit}
          />

          <BottomMetric
            label="目标体重"
            value={formatNumber(finalTargetWeight, 1)}
            unit={unit}
          />

          <BottomMetric label="运动频率" value="每周 1-2 次" />
        </div>

        <button
          type="button"
          onClick={() => setShowPricing(true)}
          className="mt-7 h-16 w-full rounded-full bg-lime-300 text-xl font-extrabold text-black shadow-[0_0_28px_rgba(163,255,18,0.35)] transition hover:bg-lime-200"
        >
          解锁完整计划
        </button>

        <button
          type="button"
          onClick={resetQuiz}
          className="mt-4 h-12 w-full rounded-full text-sm text-white/45"
        >
          重新测评
        </button>
      </div>

      {showPricing && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 px-4 pb-4">
          <motion.div
            initial={{ y: 240, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mx-auto w-full max-w-md rounded-[2rem] bg-white p-6 text-black"
          >
            <div className="mb-5 text-center">
              <h2 className="text-2xl font-semibold">开启 7 天计划</h2>
              <p className="mt-2 text-sm text-black/50">
                包含个性化训练、饮食建议和每日进度追踪。
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-lime-100 p-5">
              <div className="text-sm font-medium text-black/50">推荐方案</div>
              <div className="mt-2 text-4xl font-semibold">¥19.9</div>
              <div className="mt-1 text-sm text-black/50">首周体验价</div>
            </div>

            <button className="mt-5 h-14 w-full rounded-full bg-black font-semibold text-white">
              立即订阅
            </button>

            <button
              onClick={() => setShowPricing(false)}
              className="mt-3 h-12 w-full rounded-full text-sm text-black/50"
            >
              暂时不了
            </button>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}