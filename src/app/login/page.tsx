"use client"
import { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-black max-w-md w-full p-8 rounded-lg shadow-md border border-white space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v.01M12 8V4v4zm0 8v4v-4zm-6 4h4-4zm12 0h4-4zm-8-8H4h4zm12 0h-4 4zm-8 0v-4 4zm0-8V4v4z"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 font-bold focus:outline-none"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-center">
          <p>
            Don't have an account already? <a href="/register">Register</a>
          </p>
          <p>
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
