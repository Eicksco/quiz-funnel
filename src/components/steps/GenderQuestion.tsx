"use client";

import { useState } from "react";
import { useQuizStore, type Gender } from "@/store/useQuizStore";

export function GenderQuestion() {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const updateField = useQuizStore((state) => state.updateField);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);

  function handleSelect(value: Gender) {
    setSelectedGender(value);
    updateField("gender", value);

    window.setTimeout(() => {
      nextQuestion();
    }, 650);
  }

  return (
    <section className="flex flex-col justify-start">
      <div className="gender-header text-center">
        <p className="gender-subtitle step-title text-sm font-medium text-lime-300">
          个性化健康测评
        </p>

        <h1 className="main-title text-3xl font-semibold leading-tight text-white">
          请选择你的性别
        </h1>

        <p className="sub-title text-sm leading-6 text-white/50">
          我们会根据你的基础信息生成更贴合的运动和体重趋势预测。
        </p>
      </div>

      <div className="gender-options">
        <button
          type="button"
          className={`gender-card female-card ${
            selectedGender === "female"
              ? "selected"
              : selectedGender
                ? "unselected"
                : ""
          }`}
          onClick={() => handleSelect("female")}
        >
          <div className="gender-info">
            <div className="gender-label">女</div>
            <div className="gender-symbol">♀</div>
          </div>

          <img
            src="/images/female.png"
            alt="女性"
            className="gender-person female-person"
          />
        </button>

        <button
          type="button"
          className={`gender-card male-card ${
            selectedGender === "male"
              ? "selected"
              : selectedGender
                ? "unselected"
                : ""
          }`}
          onClick={() => handleSelect("male")}
        >
          <div className="gender-info">
            <div className="gender-label">男</div>
            <div className="gender-symbol">♂</div>
          </div>

          <img
            src="/images/male.png"
            alt="男性"
            className="gender-person male-person"
          />
        </button>
      </div>
    </section>
  );
}
