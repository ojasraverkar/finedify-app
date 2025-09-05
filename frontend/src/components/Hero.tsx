import { Link } from 'react-router-dom'; // <-- Import Link

const Hero = () => {
  return (
    <section className="text-center py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-semibold">
          Master Smart Investing
        </span>
        <h1 className="text-5xl font-bold my-4">
          Learn to Invest Smart with Confidence
        </h1>
        <p className="text-gray-600 mb-8">
          Master stock market fundamentals, risk assessment, and portfolio management through interactive tutorials, virtual trading, and expert guidance. Build your financial future today.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup"> {/* <-- Add Link for Start Learning */}
            <button className="px-6 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">
              Start Learning Free →
            </button>
          </Link>
          <button className="px-6 py-3 bg-white border rounded-lg font-semibold text-gray-700 hover:bg-gray-100">
            ▷ Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;