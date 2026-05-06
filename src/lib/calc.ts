import type { ActivityLevel, Goal, UnitSystem } from "@/store/useQuizStore";

type ResultInput = {
  unitSystem: UnitSystem;
  height: string;
  weight: string;
  targetWeight: string;
  activityLevel: ActivityLevel;
  goal: Goal;
};

function toKg(value: number, unitSystem: UnitSystem) {
  return unitSystem === "metric" ? value : value * 0.453592;
}

function toCm(value: number, unitSystem: UnitSystem) {
  return unitSystem === "metric" ? value : value * 2.54;
}

function getWeeklyChange(activityLevel: ActivityLevel, goal: Goal) {
  const base =
    activityLevel === "active"
      ? 0.75
      : activityLevel === "often"
        ? 0.6
        : activityLevel === "sometimes"
          ? 0.45
          : 0.3;

  if (goal === "build_muscle") return base * 0.75;
  if (goal === "shape") return base * 0.85;
  return base;
}

export function calculateReport(input: ResultInput) {
  const heightCm = toCm(Number(input.height), input.unitSystem);
  const currentKg = toKg(Number(input.weight), input.unitSystem);
  const targetKg = toKg(Number(input.targetWeight), input.unitSystem);

  const heightM = heightCm / 100;
  const bmi = currentKg / (heightM * heightM);

  const diff = Math.abs(currentKg - targetKg);
  const weeklyChange = getWeeklyChange(input.activityLevel, input.goal);
  const weeks = Math.max(2, Math.ceil(diff / weeklyChange));

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weeks * 7);

  const trend = Array.from({ length: Math.min(weeks + 1, 12) }, (_, index) => {
    const ratio = index / Math.min(weeks, 11);
    const value = currentKg + (targetKg - currentKg) * ratio;

    return {
      week: `W${index}`,
      weight:
        input.unitSystem === "metric"
          ? Number(value.toFixed(1))
          : Number((value / 0.453592).toFixed(1)),
    };
  });

  return {
    bmi: Number(bmi.toFixed(1)),
    weeks,
    targetDate: targetDate.toLocaleDateString("zh-CN", {
      month: "long",
      day: "numeric",
    }),
    trend,
  };
}
