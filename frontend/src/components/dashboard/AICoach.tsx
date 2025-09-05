import React, { useState } from 'react';

export default function AICoach() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');

    // Simulate an AI API call with a 1.5-second delay
    setTimeout(() => {
      const cannedResponse = `Great question about "${query}"! A core principle for new investors in India is understanding SIPs (Systematic Investment Plans). They help you invest a fixed amount regularly in mutual funds, which averages out your costs over time—a strategy called rupee cost averaging. This is a powerful way to build wealth steadily. Always remember to diversify and research funds on platforms like Tickertape or Value Research before investing.`;
      setResponse(cannedResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">🤖</span> AI Investor Coach
      </h3>
      <p className="text-gray-600 mb-4">
        Ask any financial question to get a simplified explanation. (e.g., "What is a mutual fund?")
      </p>
      <form onSubmit={handleAsk}>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg font-bold shadow hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="mt-4 text-center text-gray-500">
          <p>Your AI Coach is thinking...</p>
        </div>
      )}
      {response && (
        <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}