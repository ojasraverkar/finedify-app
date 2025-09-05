import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const modules = [
  {
    title: "What is a Stock?",
    level: "Beginner",
    description: "Learn the basics of stocks, bonds, and market mechanics.",
    lessons: 12,
    color: "blue-600",
    gradient: "from-orange-100 via-white to-blue-100",
  },
  {
    title: "Understanding Risk",
    level: "Intermediate",
    description: "Master techniques to evaluate and manage investment risks.",
    lessons: 10,
    color: "orange-500",
    gradient: "from-orange-100 via-white to-blue-100",
  },
  {
    title: "Portfolio Diversification",
    level: "Intermediate",
    description: "Build balanced portfolios for long-term wealth creation.",
    lessons: 8,
    color: "blue-600",
    gradient: "from-orange-100 via-white to-blue-100",
  },
  {
    title: "Reading Financial Statements",
    level: "Advanced",
    description: "Introduction to financial statements and analysis.",
    lessons: 12,
    color: "orange-500",
    gradient: "from-orange-100 via-white to-blue-100",
  },
];

const Modules = () => {
  return (
    <div className="min-h-screen bg-background px-4 md:px-16 lg:px-32">
      <Header />
      <main className="py-12 flex flex-col items-center w-full">
        <h2 className="text-5xl font-extrabold mb-8 text-center text-orange-500 drop-shadow-lg">Explore Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center w-full max-w-7xl mx-auto">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${mod.gradient} rounded-2xl shadow-2xl p-10 flex flex-col items-center border-4 border-orange-400 hover:scale-105 transition-transform`}
            >
              <span className={`text-${mod.color} font-bold mb-3 text-xl`}>{mod.level}</span>
              <h3 className="text-3xl font-bold mb-3 text-center text-blue-700">{mod.title}</h3>
              <p className="text-gray-700 mb-6 text-center text-lg">{mod.description}</p>
              <span className="text-md text-gray-500 mb-3">{mod.lessons} lessons • Interactive quizzes</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Modules;
