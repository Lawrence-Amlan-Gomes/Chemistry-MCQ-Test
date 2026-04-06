"use client";
import { Award, BookOpen, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // User is not logged in, they can see the landing page
    }
  }, [user, loading]);

  const handleStartTest = () => {
    if (user) {
      router.push("/chemistry");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Chemistry MCQ Test
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Master Chemistry Concepts for SSC Examination Success
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Comprehensive multiple-choice questions covering Organic Chemistry,
            Inorganic Chemistry, and Physical Chemistry designed specifically
            for SSC exam preparation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartTest}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              {user ? "Continue to Chemistry Test" : "Login to Start Test"}
            </button>
            {user && (
              <Link
                href="/progress"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-lg flex items-center justify-center"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Progress
              </Link>
            )}
          </div>

          {!user && (
            <p className="mt-4 text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up here
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Chemistry MCQ Test?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Comprehensive Coverage
              </h3>
              <p className="text-gray-600">
                Complete syllabus coverage including all major chemistry topics
                for SSC exams
              </p>
              <Link
                href="/comprehensive-coverage"
                className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                View Syllabus
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
              <p className="text-gray-600">
                Get immediate results with detailed explanations for each
                question
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exam Tips</h3>
              <p className="text-gray-600">
                Tips and strategies for SSC chemistry exams
              </p>
              <Link
                href="/tips"
                className="inline-block mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                View Tips
              </Link>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed performance analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chemistry Topics Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Chemistry Topics Covered
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Organic Chemistry
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Hydrocarbons & Functional Groups
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Reaction Mechanisms
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Biomolecules
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Polymers
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Inorganic Chemistry
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Periodic Table & Elements
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Chemical Bonding
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Coordination Compounds
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Metallurgy
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4">
                Physical Chemistry
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Chemical Thermodynamics
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Chemical Kinetics
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Electrochemistry
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Solutions & Colligative Properties
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Excel in Your SSC Chemistry Exam?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of students who are preparing with our comprehensive
            MCQ tests
          </p>
          <button
            onClick={handleStartTest}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-xl"
          >
            {user ? "Get Started Now" : "Login to Get Started"}
          </button>
        </div>
      </section>
    </div>
  );
}
