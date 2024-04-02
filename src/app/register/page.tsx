"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { z } from "zod";

import { Toast } from "primereact/toast";

import { Password } from "primereact/password";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import secureLocalStorage from 'react-secure-storage';

import hashPassword from "../_utils/hash";
import { REGISTER_URL } from '../_utils/constants';

const Register = () => {

    useEffect(() => {
        secureLocalStorage.clear();
    }, []);

    const toast = useRef<Toast>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    // Validators
    const isValidFirstName = z.string().min(1).max(50).safeParse(firstName);
    const isValidLastName = z.string().min(1).max(50).safeParse(lastName);
    const isValidEmail = z.string().min(5).max(320).email().safeParse(userEmail);
    const isValidPassword = z.string().min(8).safeParse(userPassword);
    const isValidConfirmPassword = z.string().min(8).max(50).safeParse(confirmPassword);
    const isMatchingPassword = userPassword === confirmPassword;
    
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


    const handleRegister = async(e: any) => {
        e.preventDefault();

        // Guard Clauses
        if(!isValidFirstName.success) {
            alertError("Invalid Details", 
                "Please check all the fields and try again.");
            return;
        }
        if(!isValidLastName.success) {
            alertError("Invalid Details", 
                "Please check all the fields and try again.");
            return;
        }
        if(!isValidEmail.success) {
            alertError("Invalid Details", 
                "Please check all the fields and try again.");
            return;
        }
        if(!isValidPassword.success) {
            alertError("Invalid Password", 
                "Please check the password field and try again.");
            return;
        }
        if(!isMatchingPassword) {
            alertError("Confirm Password Error", 
                "Both passwords do not seem to match!");
            return;
        }

        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "email" : userEmail,
                    "password" : hashPassword(userPassword),
                })
            });

            const data = await response.json();
            if (response.status === 200){
                alertSuccess("Registration Successful", data.message);
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else if (response.status === 500){
                alertError("Registration Failed", data.message);
            } else {
                alertError("Registration Failed", data.message);
            }
        } catch(error){
            console.log(error);
            alertError("Oops!", "Something went wrong. Please try again.")
            return;
        }
    }

  return (
        <main className="bg-slate-100 min-h-screen flex items-center justify-center">
            <Toast position="bottom-center" ref={toast} />
            <div className="border-slate-400 border-2 p-10 rounded-md bg-slate-200">
                {/* Heading */}
                <h1 className="font-bold text-2xl p-2 text-center">Create Account</h1>
                {/* Registration Form */}
                <form className="space-y-6" onSubmit={handleRegister}>
                    {/* First Name */}
                    <div>
                        <label>
                            First Name
                        </label>
                        <div>
                            <input
                                type="text"
                                placeholder='Enter your First Name'
                                onChange={(e) => setFirstName(e.target.value)}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidFirstName.success && firstName ? ' ring-red-500' : isValidFirstName.success && firstName ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>
                    {/* Last Name */}
                    <div>
                        <label>
                            Last Name
                        </label>
                        <div>
                            <input
                                type="text"
                                placeholder='Enter your Last Name'
                                onChange={(e) => setLastName(e.target.value.toLowerCase())}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidLastName.success && lastName ? ' ring-red-500' : isValidLastName.success && lastName ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label>
                            Email
                        </label>
                        <div>
                            <input
                                type="email"
                                placeholder='Enter your Email'
                                onChange={(e) => setUserEmail(e.target.value)}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidEmail.success && userEmail ? ' ring-red-500' : isValidEmail.success && userEmail ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <label>
                           Password 
                        </label>
                        <div>
                            <input
                                type="password"
                                placeholder='Enter your Password'
                                onChange={(e) => setUserPassword(e.target.value)}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidPassword.success && userPassword ? ' ring-red-500' : isValidPassword.success && userPassword ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label>
                            Confirm Password
                        </label>
                        <div>
                            <input
                                type="password"
                                placeholder='Confirm your password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidConfirmPassword.success && confirmPassword ? ' ring-red-500' : isValidConfirmPassword.success && confirmPassword ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>

                    {/* Already Have an Account ? */}
                    <p className="mt-10 text-center text-md text-gray-500">
                        {"Have an account already? "}
                        <Link className="font-medium leading-6 text-blue-600 hover:underline" href="/login">Login</Link>
                    </p>
                    <div>
                        <input
                            value="Register"
                            type="submit"
                            className="w-full text-lg rounded-lg bg-black text-white p-2 cursor-pointer"
                        ></input>
                    </div>
                </form>
            </div>
    </main>
  );
};

export default Register;
