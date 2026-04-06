"use client";
import { CheckCircle, Circle } from "lucide-react";
import { useEffect, useState } from "react";

export default function EachOption({
  option,
  activeCircle,
  setActiveCircle,
  correctAns,
  isSubmitted,
}) {
  const [selected, setSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (option === correctAns) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      if (option === activeCircle) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setIsCorrect(false);
      setSelected(false);
    }
  }, [activeCircle, correctAns, isSubmitted, option]);

  const handleClick = () => {
    if (!isSubmitted) {
      setActiveCircle(option);
    }
  };

  const getOptionStyles = () => {
    if (isSubmitted) {
      if (option === correctAns) {
        return "bg-green-50 border-green-200 text-green-800";
      } else if (option === activeCircle) {
        return "bg-red-50 border-red-200 text-red-800";
      } else {
        return "bg-gray-50 border-gray-200 text-gray-600";
      }
    } else {
      if (option === activeCircle) {
        return "bg-blue-50 border-blue-200 text-blue-800";
      } else {
        return "bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-blue-300";
      }
    }
  };

  const getIconColor = () => {
    if (isSubmitted) {
      if (option === correctAns) {
        return "text-green-600";
      } else if (option === activeCircle) {
        return "text-red-600";
      } else {
        return "text-gray-400";
      }
    } else {
      return option === activeCircle ? "text-blue-600" : "text-gray-400";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${getOptionStyles()}`}
    >
      {/* Option Indicator */}
      <div className="flex items-start space-x-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSubmitted ? (option === correctAns ? "bg-green-100 border-green-300" : option === activeCircle ? "bg-red-100 border-red-300" : "bg-gray-100 border-gray-300") : "bg-blue-100 border-blue-300"}`}
        >
          {isSubmitted && option === correctAns ? (
            <CheckCircle className="w-4 h-4" />
          ) : isSubmitted && option === activeCircle ? (
            <Circle className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1">
          <span
            className={`font-medium ${isSubmitted ? (option === correctAns ? "text-green-800" : option === activeCircle ? "text-red-800" : "text-gray-600") : option === activeCircle ? "text-blue-800" : "text-gray-800"}`}
          >
            {option}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${!isSubmitted && option === activeCircle ? "bg-blue-50 opacity-10" : "opacity-0 group-hover:opacity-10"}`}
      ></div>

      {/* Selection Indicator */}
      {!isSubmitted && option === activeCircle && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
