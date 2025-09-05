import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Real-time validation
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const validatePassword = (pw: string) => pw.length >= 8;

  // Password strength meter
  const checkStrength = (pw: string) => {
    if (pw.length < 8) return 'Weak';
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(pw)) return 'Strong';
    return 'Medium';
  };

  // Update password strength
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStrength(checkStrength(e.target.value));
  };

  // Social login stubs
  const handleSocialLogin = (provider: string) => {
    setMessage(`Social login with ${provider} coming soon!`);
    // Backend integration: POST to /auth/social-login with provider
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) && !validatePhone(phone)) {
      setMessage('Please enter a valid email or phone number.');
      return;
    }
    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters.');
      return;
    }
    if (!agree) {
      setMessage('You must agree to the terms and privacy policy.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, phone, password });
      setMessage('Registration successful! Please log in.');
    } catch (err: any) {
      setMessage(err.response?.data?.msg || 'An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      {/* Illustration */}
      <a href="/" className="absolute top-8 left-8">
        <div className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer px-2 py-1 rounded-lg border-2 border-orange-500 bg-white shadow hover:bg-orange-50 transition">
          f<span className="text-orange-500">IND</span>ify
        </div>
      </a>
      <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl border-2 border-orange-500 flex flex-row items-center gap-8 my-8">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-6 text-blue-700 text-center">Create Your f<span className="text-orange-500">IND</span>ify Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full p-4 border-2 border-orange-500 rounded-lg text-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition placeholder:animate-pulse" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full p-4 border-2 border-blue-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder:animate-pulse" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" className="w-full p-4 border-2 border-blue-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder:animate-pulse" />
            <div className="relative w-full">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="Password" required className="w-full p-4 border-2 border-orange-500 rounded-lg text-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition placeholder:animate-pulse" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-blue-600 font-bold">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <div className="w-full flex items-center justify-between">
              <span className={`text-sm font-bold ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-orange-500' : 'text-red-500'}`}>Password Strength: {passwordStrength}</span>
              <span className="text-xs text-gray-500" title="Password must be at least 8 characters, include a number, uppercase letter, and special character.">?</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} className="mr-2" />
              <span className="text-sm">I agree to the <button type="button" onClick={() => setMessage('Terms: You agree to use this platform for educational purposes only. No financial advice or trading.')} className="text-blue-600 underline">Terms</button> and <button type="button" onClick={() => setMessage('Privacy Policy: We do not collect personal data. All activity is simulated.')} className="text-blue-600 underline">Privacy Policy</button></span>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg font-bold text-lg border-2 border-blue-600 hover:from-orange-600 hover:to-blue-600 transition flex items-center justify-center">
              {loading ? <span className="loader mr-2"></span> : null} Register
            </button>
          </form>
          {/* Social login buttons */}
          <div className="flex flex-col gap-2 mt-6 w-full">
            <button type="button" onClick={() => handleSocialLogin('Google')} className="w-full py-3 bg-white border-2 border-blue-500 rounded-lg font-bold text-blue-700 shadow hover:bg-blue-50 transition">Sign up with Google</button>
            <button type="button" onClick={() => handleSocialLogin('LinkedIn')} className="w-full py-3 bg-white border-2 border-blue-500 rounded-lg font-bold text-blue-700 shadow hover:bg-blue-50 transition">Sign up with LinkedIn</button>
          </div>
          {message && <p className="mt-6 text-center text-orange-600 text-lg font-semibold">{message}</p>}
          <div className="mt-6 text-center text-gray-600 text-lg">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline font-bold">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}