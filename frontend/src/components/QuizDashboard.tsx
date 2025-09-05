import React, { useEffect, useState } from "react";
import axios from "axios";

export const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("https://findefy-14vpu07mo-ojas12062006-7157s-projects.vercel.app/api/quiz");
        setQuizzes(res.data);
      } catch (err) {}
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  if (selectedQuiz) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{selectedQuiz.quizTitle}</h2>
        <p className="mb-4 text-gray-600">Module: {selectedQuiz.moduleTitle}</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700" onClick={() => setSelectedQuiz(null)}>Back to Quizzes</button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Quizzes & Assessments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border-2 border-orange-200 hover:border-blue-500 transition w-full h-full">
            <div className="font-bold text-blue-700 text-lg mb-2">{quiz.quizTitle}</div>
            <div className="text-sm text-gray-600 mb-2">Module: {quiz.moduleTitle}</div>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded font-bold shadow hover:scale-105 transition" onClick={() => setSelectedQuiz(quiz)}>Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};
  export default QuizDashboard;
