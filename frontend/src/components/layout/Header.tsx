import React from 'react';

// Define the props the Header will accept
interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogout?: () => void;
  onEnterDashboard?: () => void;
}

export default function Header({
  isLoggedIn = false,
  username,
  onLogout,
  onEnterDashboard,
}: HeaderProps) {
  return (
    <header className="w-full flex justify-center items-center p-2 h-16 bg-gradient-to-r from-orange-500 via-white to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="flex items-center w-full max-w-7xl mx-auto justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer px-2 py-1 rounded-lg border-2 border-orange-500 bg-white shadow">
            f<span className="text-orange-500">IND</span>ify
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            // RENDER THIS WHEN LOGGED IN (ON DASHBOARD)
            <>
              <span className="text-gray-700 font-semibold hidden sm:block">
                Hi, <span className="font-bold">{username}</span>
              </span>
              <button
                onClick={onLogout}
                className="px-6 py-2 text-blue-600 border-2 border-orange-500 rounded-full font-bold bg-white shadow hover:bg-orange-100 transition text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            // RENDER THIS WHEN LOGGED OUT (ON LANDING PAGE)
            <>
              <button
                onClick={onEnterDashboard}
                className="px-6 py-2 text-white bg-gradient-to-r from-orange-500 to-blue-600 border-2 border-blue-600 rounded-full font-bold shadow hover:bg-orange-600 transition text-lg"
              >
                Get Started
              </button>
              <button
                onClick={onEnterDashboard}
                className="px-6 py-2 text-blue-600 border-2 border-orange-500 rounded-full font-bold bg-white shadow hover:bg-orange-100 transition text-lg"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}