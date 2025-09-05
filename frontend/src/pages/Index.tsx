import React from 'react';
// Using relative paths for stability
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Define the props to handle navigation
interface IndexProps {
  onEnterDashboard: () => void;
}

export default function Index({ onEnterDashboard }: IndexProps) {
  // Data for the features section
  const features = [
    {
      title: "Trading Simulator",
      description: "Experience a premium trading UI, place virtual trades, and analyze your strategies without risk.",
      icon: "💹",
    },
    {
      title: "Learning Modules",
      description: "Follow interactive lessons, track your progress, and get ratings for every module you complete.",
      icon: "🎓",
    },
    {
      title: "Stock Wishlist",
      description: "Track stocks you're interested in, with live price updates and easy portfolio management.",
      icon: "⭐",
    },
    {
      title: "Quizzes & Assessments",
      description: "Test your investor literacy with India-focused quizzes and see how you rank.",
      icon: "📝",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header onEnterDashboard={onEnterDashboard} />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 w-full">
        
        {/* Hero Section */}
        <section className="max-w-5xl w-full mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4 tracking-tight">
            Welcome to{' '}
            <span className="text-orange-500" style={{ fontFamily: 'monospace' }}>
              fINDify
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Your all-in-one platform for learning, trading, and mastering the stock market.<br className="hidden md:inline" />
            <span className="block mt-2">Explore premium features designed for every investor.</span>
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <button
              onClick={onEnterDashboard}
              className="px-10 py-5 text-white bg-gradient-to-r from-orange-500 to-blue-600 rounded-full font-bold text-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-blue-100 hover:border-orange-500 transition-all duration-200 hover:scale-105"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
                {feature.title}
              </h2>
              <p className="text-gray-700 text-center text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* How it Works Section */}
        <section className="max-w-4xl w-full mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">How it Works</h2>
          <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2 text-left md:text-center mx-auto max-w-xl">
            <li>Sign up and create your account</li>
            <li>Explore learning modules and track your progress</li>
            <li>Use the wishlist to monitor stocks</li>
            <li>Level up your financial literacy!</li>
          </ol>
        </section>
        
        {/* Stats Section */}
        <section className="max-w-5xl w-full mx-auto text-center mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-blue-100">
            <div className="text-5xl font-extrabold text-orange-500 mb-2">12,000+</div>
            <div className="text-lg text-gray-700">Users Registered</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-blue-100">
            <div className="text-5xl font-extrabold text-blue-700 mb-2">50,000+</div>
            <div className="text-lg text-gray-700">Trades Simulated</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-blue-100">
            <div className="text-5xl font-extrabold text-orange-500 mb-2">100+</div>
            <div className="text-lg text-gray-700">Modules Completed</div>
          </div>
        </section>
        
        {/* Disclaimer Section */}
        <div className="w-full flex justify-center mb-4 px-4">
          <div className="bg-red-100 border border-red-400 rounded-lg p-4 text-sm text-red-700 font-semibold max-w-3xl">
            <span className="font-bold">Disclaimer:</span> This platform is for educational purposes only. No financial advice. No real trading integration—strictly simulated.<br />
            For safe investing, visit{' '}
            <a
              href="https://scores.gov.in/scores/Welcome.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700"
            >
              SEBI Investor Helpline
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}