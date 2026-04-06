"use client";
import {
  Brain,
  CheckCircle2,
  Clock,
  FlaskConical,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../app/contexts/AuthProvider";
import hardcodedMcqs from "../app/mcqdatabase/chemistry";
import EachMcq from "./EachMcq";

export default function McqGenerate({ subject }) {
  const { user } = useAuth();
  const router = useRouter();
  const [mcqs, setMcqs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [generateButton, setGenerateButton] = useState("Generate");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Function to randomly select 10 MCQs
  const getResponse = () => {
    setGenerateButton("Generating...");
    setTimeout(() => {
      const shuffled = hardcodedMcqs.sort(() => 0.5 - Math.random());
      const selectedMcqs = shuffled.slice(0, 10).map((mcq, index) => ({
        ...mcq,
        id: index + 1,
      }));
      setMcqs(selectedMcqs);
      setGenerateButton("Generated");
      setIsTimerActive(true);
      setTimeLeft(600); // 10 minutes for 10 questions
      setShowResults(false);
      console.log("Selected MCQs:", selectedMcqs);
    }, 800);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      const submitted = confirm(
        "Do you want to submit your answers? You can't submit again.",
      );
      if (submitted) {
        setIsSubmitted(true);
        setIsTimerActive(false);
        setShowResults(true);
      }
    }
  };

  // Save score when it's calculated after submission
  useEffect(() => {
    if (isSubmitted && score > 0 && totalScore > 0) {
      const saveScore = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("/api/auth/save-score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              score: score,
              totalQuestions: totalScore,
            }),
          });

          const result = await response.json();
          if (result.success) {
            console.log("Score saved successfully:", result);
          } else {
            console.error("Failed to save score:", result.error);
          }
        } catch (error) {
          console.error("Error saving score:", error);
        }
      };

      saveScore();
    }
  }, [isSubmitted, score, totalScore]);

  const retest = () => {
    setMcqs([]);
    setIsSubmitted(false);
    setScore(0);
    setTotalScore(0);
    setGenerateButton("Generate");
    setTimeLeft(600); // Reset to 10 minutes
    setIsTimerActive(false);
    setShowResults(false);
  };

  useEffect(() => {
    setTotalScore(mcqs.length);
  }, [mcqs]);

  const getScoreColor = () => {
    const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Practicing! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FlaskConical className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Chemistry MCQ Test
              </h1>
            </div>

            {mcqs.length > 0 && (
              <div className="flex items-center space-x-6">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    timeLeft <= 60
                      ? "bg-red-100 text-red-600"
                      : timeLeft <= 120
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-mono font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Question {mcqs.length > 0 ? 1 : 0} of {mcqs.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {generateButton === "Generate" || generateButton === "Generating..." ? (
          /* Generate Section */
          <div className="flex flex-col items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Test Your Chemistry Knowledge?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                  Get 10 random multiple-choice questions covering all aspects
                  of chemistry. You'll have 10 minutes to complete the test!
                </p>
              </div>

              <button
                onClick={getResponse}
                disabled={generateButton === "Generating..."}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center space-x-2">
                  {generateButton === "Generating..." ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent border-r-transparent animate-spin rounded-full"></div>
                      <span>Generating Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Test</span>
                    </>
                  )}
                </span>
              </button>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">10 Questions</h3>
                  <p className="text-sm text-gray-600">Random MCQs</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">10 Minutes</h3>
                  <p className="text-sm text-gray-600">Time Limit</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">
                    Instant Results
                  </h3>
                  <p className="text-sm text-gray-600">Get Score</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Test Section */
          <div className="space-y-6">
            {mcqs.map((mcq) => (
              <EachMcq
                key={mcq.id}
                mcq={mcq}
                isSubmitted={isSubmitted}
                setScore={setScore}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {mcqs.length > 0 && !isSubmitted && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Submit Test
            </button>
          </div>
        )}

        {/* Results Section */}
        {isSubmitted && showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform scale-100 transition-transform">
              {/* Close Button */}
              <button
                onClick={() => setShowResults(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    score / totalScore >= 0.8
                      ? "bg-green-100"
                      : score / totalScore >= 0.6
                        ? "bg-yellow-100"
                        : "bg-red-100"
                  }`}
                >
                  <Trophy
                    className={`w-10 h-10 ${
                      score / totalScore >= 0.8
                        ? "text-green-600"
                        : score / totalScore >= 0.6
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Test Completed!
                </h2>

                <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
                  {score}/{totalScore}
                </div>

                <p className={`text-lg font-semibold mb-6 ${getScoreColor()}`}>
                  {getScoreMessage()}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Accuracy:</span>{" "}
                    {Math.round((score / totalScore) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Correct:</span> {score} out
                    of {totalScore} questions
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons After Results */}
        {isSubmitted && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={retest}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
