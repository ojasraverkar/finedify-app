import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 via-white to-orange-500 py-8 px-4 mt-12 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Brand/Info Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left flex-1">
          <div className="text-2xl font-extrabold text-blue-700 mb-2">
            f<span className="text-orange-500">IND</span>ify
          </div>
          <p className="text-gray-700 mb-4 max-w-xs">
            Empowering investors with education, virtual trading, and premium tools. Your journey to financial literacy starts here.
          </p>
          {/* Social media icons can be added back here if you use a library like FontAwesome */}
        </div>

        {/* Footer Sections */}
        <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-8 w-full md:w-auto">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-blue-700 mb-2">Legal</h3>
            <ul className="flex flex-row gap-4 justify-center items-center">
              <li>
                <button onClick={() => alert('Privacy Policy: We do not collect personal data. All activity is simulated.')} className="hover:text-orange-500 transition font-bold px-4 py-2 rounded bg-white shadow">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => alert('Terms of Service: Use this platform for education only. No financial advice or trading.')} className="hover:text-orange-500 transition font-bold px-4 py-2 rounded bg-white shadow">Terms of Service</button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-blue-700 mb-2">Newsletter</h3>
            <form className="flex flex-col space-y-2 w-full items-center">
              <input type="email" placeholder="Your email" className="px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full" />
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded font-bold shadow hover:bg-orange-600 transition w-full">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-8">
        <hr className="w-1/2 border-blue-300 mb-4" />
        <div className="text-gray-600 text-sm mb-2">&copy; {new Date().getFullYear()} <span className="font-bold text-blue-700">fINDify</span>. All rights reserved.</div>
      </div>
    </footer>
  );
};