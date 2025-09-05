import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center p-2 h-16 bg-gradient-to-r from-orange-500 via-white to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="flex items-center w-full max-w-7xl mx-auto justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center justify-center">
            <div className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer px-2 py-1 rounded-lg border-2 border-orange-500 bg-white shadow hover:bg-orange-50 transition">
              f<span className="text-orange-500">IND</span>ify
            </div>
          </Link>
          {/* Navigation removed as requested */}
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/signup">
            <button className="px-6 py-2 text-white bg-gradient-to-r from-orange-500 to-blue-600 border-2 border-blue-600 rounded-full font-bold shadow hover:bg-orange-600 transition text-lg">Get Started</button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 text-blue-600 border-2 border-orange-500 rounded-full font-bold bg-white shadow hover:bg-orange-100 transition text-lg">Sign In</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;