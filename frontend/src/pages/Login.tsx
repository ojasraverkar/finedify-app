import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  // Real-time validation
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (pw: string) => pw.length >= 8;

  // Social login stubs
  const handleSocialLogin = (provider: string) => {
    setMessage(`Social login with ${provider} coming soon!`);
    // Backend integration: POST to /auth/social-login with provider
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password, rememberMe });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.msg || 'An error occurred.');
    }
    setLoading(false);
  };

  // Forgot password flow
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(resetEmail)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      // Backend integration: POST to /auth/forgot-password
      await axios.post(`${API_URL}/auth/forgot-password`, { email: resetEmail });
      setMessage('Password reset link sent to your email.');
    } catch (err: any) {
      setMessage(err.response?.data?.msg || 'An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Illustration */}
      <a href="/" className="absolute top-8 left-8">
        <div className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer px-2 py-1 rounded-lg border-2 border-orange-500 bg-white shadow hover:bg-orange-50 transition">
          f<span className="text-orange-500">IND</span>ify
        </div>
      </a>
      <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl border-2 border-orange-500 flex flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-6 text-blue-700 text-center">Sign In to f<span className="text-orange-500">IND</span>ify</h2>
          {!forgot ? (
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full p-4 border-2 border-blue-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder:animate-pulse" />
              <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-4 border-2 border-orange-500 rounded-lg text-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition placeholder:animate-pulse" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-blue-600 font-bold">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              <div className="flex items-center justify-between w-full">
                <label className="flex items-center text-sm">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2" /> Remember Me
                </label>
                <button type="button" onClick={() => setMessage('Forgot password feature coming soon!')} className="text-blue-600 underline text-sm font-bold">Forgot Password?</button>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg font-bold text-lg border-2 border-blue-600 hover:from-orange-600 hover:to-blue-600 transition flex items-center justify-center">
                {loading ? <span className="loader mr-2"></span> : null} Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgot} className="space-y-6 w-full">
              <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Enter your email" required className="w-full p-4 border-2 border-blue-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder:animate-pulse" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg font-bold text-lg border-2 border-blue-600 hover:from-orange-600 hover:to-blue-600 transition flex items-center justify-center">
                {loading ? <span className="loader mr-2"></span> : null} Send Reset Link
              </button>
              <button type="button" onClick={() => setForgot(false)} className="text-blue-600 underline text-sm font-bold">Back to Login</button>
            </form>
          )}
          {/* Social login buttons */}
          <div className="flex flex-col gap-2 mt-6 w-full">
            <button type="button" onClick={() => handleSocialLogin('Google')} className="w-full py-3 bg-white border-2 border-blue-500 rounded-lg font-bold text-blue-700 shadow hover:bg-blue-50 transition">Sign in with Google</button>
            <button type="button" onClick={() => handleSocialLogin('LinkedIn')} className="w-full py-3 bg-white border-2 border-blue-500 rounded-lg font-bold text-blue-700 shadow hover:bg-blue-50 transition">Sign in with LinkedIn</button>
          </div>
          {message && <p className="mt-6 text-center text-orange-600 text-lg font-semibold">{message}</p>}
          <div className="mt-6 text-center text-gray-600 text-lg">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:underline font-bold">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}