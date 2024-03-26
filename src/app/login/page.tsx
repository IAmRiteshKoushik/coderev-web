"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { z } from "zod";

import { Toast } from 'primereact/toast';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import { LOGIN_URL } from '../_utils/constants';
import secureLocalStorage from 'react-secure-storage';
import hashPassword from '../_utils/hash';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const toast = useRef<Toast>(null);
    const router = useRouter();

    const alertError = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'error',
            summary: summary,
            detail: detail,
        });
    };

    const alertSuccess = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'success',
            summary: summary,
            detail: detail,
        });
    };

    // Validators
    const isValidEmail = z.string().email().min(1).max(320).safeParse(userEmail);
    const isValidPassword = z.string().min(8).max(32).safeParse(userPassword);

    const handleLogin = async (e: any) => {
        e.preventDefault();

        // Guard Clauses
        if (!isValidEmail.success){
            alertError('Invalid Email ID', 'Please enter a valid Email ID!');
            return;
        }
        if (!isValidPassword.success){
            alertError('Invalid Password', 'Please enter a valid Password');
            return;
        }

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    userPassword: hashPassword(userPassword),
                }),
            });

            const data = await response.json();

            if (response.status === 200){
                alertSuccess("Login Successful!", "Redirecting to Dashboard...");
                secureLocalStorage.clear();
                secureLocalStorage.setItem("userAccess", data["SECRET_TOKEN"]);
                secureLocalStorage.setItem("currentUser", JSON.stringify({
                    // Response data goes here
                }));
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else if (response.status === 500){
                alertError("Oops!", "Something went wrong! Please try again later!");
            // } else if (data.message === undefined || data.message === null){
            //     alertError("Oops!", "Something went wrong! Please try again later!");
            } else {
                alertError("Oops!", "Something went wrong! Please try again later!");
            }
        } catch (error){
            console.log(error);
            alertError("Oops!", "Something went wrong! Please try again later!");
        }
    };

  return (
    <main className="bg-slate-100 min-h-screen flex items-center justify-center">
        <Toast position='bottom-center' ref={toast}/>
            <div className='border-slate-400 border-2 p-10 rounded-md bg-slate-200'>
                <h1 className=' font-bold text-2xl p-2 text-center'> Sign In </h1>
                <form className='space-y-6' onSubmit={handleLogin}>
                    {/* Username */}
                    <div>
                        <label className='block text-md font-medium leading-6 text-black'>
                            Email ID
                        </label>
                        <div>
                            <input
                                type="email"
                                autoComplete="email"
                                placeholder='Enter your Email ID'
                                onChange={(e) => setUserEmail(e.target.value.toLowerCase())}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                    (!isValidEmail.success && userEmail ? ' ring-red-500' : isValidEmail.success && userEmail ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-md font-medium leading-6 text-black">
                                Password
                            </label>
                            <div className="text-md">
                                <Link replace={true} href={"/forgotPassword"} className="font-medium text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                autoComplete="current-password"
                                placeholder='Enter your Password'
                                className={"block text-lg w-full rounded-md border-0 \
                                    py-2 px-2 text-black shadow-sm ring-1 \
                                    ring-inset ring-bGray placeholder:text-gray-400 \
                                    sm:text-md sm:leading-6 !outline-none" 
                                    + (!isValidPassword.success && userPassword ? 
                                        ' ring-red-500' : isValidPassword.success 
                                            && userPassword ? 
                                            ' ring-green-500' : ' ring-bGray')}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>            

                    {/* No Account */}
                    <p className="mt-10 text-center text-md text-gray-500">
                        {"Don't have an account? "}
                        <Link className="font-medium leading-6 text-blue-600 hover:underline" href="/register">Register</Link>
                    </p>
                    <div>
                        <input
                            value="Sign In"
                            type="submit"
                            className={"w-full text-lg rounded-lg bg-black text-white p-2 cursor-pointer"} 
                        />
                    </div>
                </form>
            </div>
    </main>
  );
};

export default Login;
