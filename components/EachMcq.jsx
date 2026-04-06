"use client";
import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import EachOption from "./EachOption";

export default function EachMcq({ mcq, isSubmitted, setScore }) {
  const [selected, setSelected] = useState("");
  const [activeCircle, setActiveCircle] = useState("");
  const [randomNumber, setRandom] = useState(0);

  useEffect(() => {
    let numbers = [1, 2, 3, 4];
    let randomIndex = Math.floor(Math.random() * numbers.length);
    setRandom(numbers[randomIndex]);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      if (mcq.correctAns === activeCircle) {
        setScore((prev) => prev + 1);
      }
    }
  }, [isSubmitted, activeCircle, mcq.correctAns]);

  const options1 = [
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
    mcq.correctAns,
  ];
  const options2 = [
    mcq.correctAns,
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
  ];
  const options3 = [
    mcq.wrongAnswer3,
    mcq.correctAns,
    mcq.wrongAnswer1,
    mcq.wrongAnswer2,
  ];
  const options4 = [
    mcq.wrongAnswer2,
    mcq.wrongAnswer3,
    mcq.correctAns,
    mcq.wrongAnswer1,
  ];

  const getOptions = () => {
    switch (randomNumber) {
      case 1:
        return options1;
      case 2:
        return options2;
      case 3:
        return options3;
      case 4:
        return options4;
      default:
        return options1;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-blue-100 font-bold text-sm">{mcq.id}</span>
            </div>
            <h3 className="text-white font-semibold text-lg">
              Question {mcq.id}
            </h3>
          </div>
          {isSubmitted && (
            <div className="flex items-center space-x-2">
              {mcq.correctAns === activeCircle ? (
                <div className="flex items-center space-x-1 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span className="text-green-100 text-sm font-medium">
                    Correct
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 bg-red-500 bg-opacity-20 px-3 py-1 rounded-full">
                  <X className="w-4 h-4 text-red-300" />
                  <span className="text-red-100 text-sm font-medium">
                    Incorrect
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="p-6 bg-gray-50">
        <p className="text-gray-800 text-lg leading-relaxed font-medium">
          {mcq.question}
        </p>
      </div>

      {/* Options */}
      <div className="p-6 space-y-3">
        {getOptions().map((option, index) => (
          <EachOption
            key={`${mcq.id}-${index}`}
            activeCircle={activeCircle}
            setActiveCircle={setActiveCircle}
            option={option}
            correctAns={mcq.correctAns}
            isSubmitted={isSubmitted}
            setScore={setScore}
          />
        ))}
      </div>
    </div>
  );
}
