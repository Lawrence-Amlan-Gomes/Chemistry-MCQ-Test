"use client";
import { Atom, Beaker, BookOpen, FlaskConical } from "lucide-react";
import { useState } from "react";

const examTips = [
  {
    topicNumber: 1,
    title: "General MCQ Strategy",
    subTitle:
      "Mastering the mechanics of multiple-choice questions to maximize efficiency and accuracy.",
    bullets: [
      {
        heading: "The Elimination Method",
        subHeading:
          "Identify and cross out clearly incorrect options first. Reducing choices from 4 to 2 increases your success probability to 50%.",
      },
      {
        heading: "Two-Pass Approach",
        subHeading:
          "Go through the paper once to answer easy questions. On the second pass, focus on time-consuming calculations or complex logic.",
      },
      {
        heading: "Time Management",
        subHeading:
          "Allocate specific time per question. If a question takes longer than 60 seconds, mark it for review and move on.",
      },
    ],
  },
  {
    topicNumber: 2,
    title: "Chemistry-Specific Hacks",
    subTitle:
      "Subject-specific mental shortcuts for Inorganic, Physical, and Organic Chemistry.",
    bullets: [
      {
        heading: "Dimensional Analysis",
        subHeading:
          "In Physical Chemistry, check if the units of your answer match the units requested. This often reveals the correct formula automatically.",
      },
      {
        heading: "Periodic Trend Shortcuts",
        subHeading:
          "Remember 'Top-Right is High' for Electronegativity and Ionization Energy (except Noble Gases), and 'Bottom-Left is Large' for Atomic Radius.",
      },
      {
        heading: "Functional Group Priority",
        subHeading:
          "Memorize the IUPAC priority list for Organic naming. Usually, the molecule is named after the most oxidized group (e.g., Carboxylic Acid).",
      },
    ],
  },
  {
    topicNumber: 3,
    title: "Common Traps to Avoid",
    subTitle:
      "Staying alert for 'distractor' options designed to catch common student errors.",
    bullets: [
      {
        heading: "Absolute Keywords",
        subHeading:
          "Be wary of options containing 'Always', 'Never', or 'Only'. In chemistry, there are almost always exceptions (like anomalous expansion of water).",
      },
      {
        heading: "Inverse Relationships",
        subHeading:
          "Watch out for questions asking for the 'Incorrect' statement or 'Least' reactive element; these are the most common sources of silly mistakes.",
      },
      {
        heading: "Unit Conversion Pitfalls",
        subHeading:
          "Always check if the temperature is in Celsius or Kelvin ($K = °C + 273$) and if the volume is in Liters or mL before calculating.",
      },
    ],
  },
];

export default function ExamTips() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Comprehensive Coverage
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            SSC Chemistry Complete Syllabus Coverage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master all three branches of chemistry with our comprehensive study
            materials. Each topic is broken down into key concepts for
            systematic learning.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {examTips.map((topic) => (
            <div
              key={topic.topicNumber}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() =>
                setSelectedTopic(
                  selectedTopic === topic.topicNumber
                    ? null
                    : topic.topicNumber,
                )
              }
            >
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {topic.topicNumber === 1 && <Atom className="w-6 h-6" />}
                    {topic.topicNumber === 2 && <Beaker className="w-6 h-6" />}
                    {topic.topicNumber === 3 && (
                      <FlaskConical className="w-6 h-6" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold">
                        Topic {topic.topicNumber}
                      </h3>
                      <p className="text-sm opacity-90">{topic.title}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {topic.bullets.length}
                  </div>
                </div>
              </div>

              {/* Topic Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{topic.subTitle}</p>

                {selectedTopic === topic.topicNumber && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    {topic.bullets.map((bullet, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {bullet.heading}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {bullet.subHeading}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Exam Strategies Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Atom className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">MCQ Strategy</h4>
              <p className="text-gray-600 text-sm">
                Elimination techniques and time management
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Beaker className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Chemistry Hacks
              </h4>
              <p className="text-gray-600 text-sm">
                Subject-specific shortcuts and memory aids
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FlaskConical className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Common Traps</h4>
              <p className="text-gray-600 text-sm">
                Avoid typical MCQ mistakes and distractors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
