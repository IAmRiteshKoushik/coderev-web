"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Toast } from "primereact/toast";
import { SelectButton } from "primereact/selectbutton";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import secureLocalStorage from 'react-secure-storage';

import { hashPassword } from "../_utils/hash";
import { REGISTER_URL } from '../_utils/constants';

const Register = () => {

    useEffect(() => {
        secureLocalStorage.clear();
    }, []);

    const toast = useRef<Toast>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Regular expressions for matching

    const router = useRouter();

    const isValid = () => {

    }

    const alertError = (summary: String, detail: String) => {
        toast.current?.show({
            severity: "error",
            summary: summary,
            detail: detail,
        });
    };

    const alertSuccess = (summary: String, detail: String) => {
        toast.current?.show({
            severity: "success",
            summary: summary,
            detail: detail,
        });
    };

  // const handleRegister = () => {
  //   if (password !== confirmPassword) {
  //     setPasswordMatchError(true);
  //     return;
  //   }
  //   setPasswordMatchError(false);
  //
  //   console.log('Registering with:', firstName, lastName, email, username, password);
  //   window.location.href = '/login';
  // };

    const handleRegister = async(e: MouseEvent) => {
        e.preventDefault();

        if(!isValid) {
            alertError("Invalid Details", 
                "Please check all the fields and try again.");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Data needs to go here
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "username" : username,
                    "email" : email,
                    "password" : hashPassword(password),
                })
            });

            const data = await response.json();
            if (response.status === 200){
                alertSuccess("Registration Successful", 
                    "Redirection to OTP Verification...");
                // console.log(data); JUST for checking
                secureLocalStorage.setItem("registerToken", data["SECRET_TOKEN"]);
                secureLocalStorage.setItem("registerEmail", email);

                setTimeout(() => {
                    router.push("/register/verify");
                }, 1000);
            } else if (response.status === 500){

            } else if (data.message !== undefined || data.message !== null){
                alertError("Registration Failed", data.message);
            } else {
                alertError("Oops!", "Something went wrong! Please try again later");
            }
        } catch(error){
            console.log(error);
            setLoading(false);
            alertError("Oops!", "Something went wrong. Please try again.")
            return;
        }

        setLoading(false);
    }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-black rounded-lg shadow-md border border-white space-y-4">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black"
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
        
        <div>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Confirm Password"
      className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-black ${
        passwordMatchError ? 'border-red-500' : ''
      }`}
      value={confirmPassword}
      onChange={(e) => {
        setConfirmPassword(e.target.value);
        if (passwordMatchError) {
          setPasswordMatchError(false);
        }
      }}
    />
    
    {passwordMatchError && (
      <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
    )}
  </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="text-center">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
