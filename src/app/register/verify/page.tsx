"use client";

import React, { useState, useRef, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import Link from "next/link";

import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"

import { REGISTER_VERIFY_URL } from '../../_utils/constants';

export default function VerifyPage(): JSX.Element {
    
    const toast = useRef<Toast>(null);

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const otpRegex = /^[0-9]{6}/;
    const isValidOtp = otp.length === 6 && otpRegex.test(otp.join());

    const [registerEmail, setRegisterEmail] = useState(secureLocalStorage.getItem("registerEmail"));
    const [registerToken, setRegisterToken] = useState(secureLocalStorage.getItem("registerToken"));
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleVerify = async (e: MouseEvent) => {
        e.preventDefault();
        const otpString = otp.join();

        try{
            const response = await fetch(REGISTER_VERIFY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer" + registerToken, 
                },
                body: JSON.stringify({
                    otp: otpString
                }),
            });

            const data = await response.json();

            if(response.status === 200){
                alertSuccess("Registration Successful", "OTP verified successfully");
                secureLocalStorage.clear();
                secureLocalStorage.setItem("userAccess", data["SECRET_TOKEN"]);
                secureLocalStorage.setItem("currentUser", JSON.stringify({
                    
                }));
                setTimeout(() => {
                    router.replace("/dashboard");
                }, 2000);
            } else if (response.status === 500){
                alertError("Oops!", "Something went wrong! Please try again later!");
            } else if (data.messge !== undefined || data.message !== null ){
                alertError("Registration Failed", data.message);
            } else {
                alertError("Oops!", "Something went wrong! Please try again later!");
            }
        }catch(error){
            console.log(error);
            alertError('Oops!', 'Something went wrong! Please try again!');
            secureLocalStorage.clear();
            setTimeout(() => {
                router.replace("/register");
            }, 2000);
        } finally {
            setLoading(false);
        }
    }

    const alertError = (summary: String, detail: String) => {
        toast.current?.show({
            severity: 'error',
            summary: summary,
            detail: detail,
        });
    };

    const alertSuccess= (summary: String, detail: String) => {
        toast.current?.show({
            severity: 'success',
            summary: summary,
            detail: detail,
        });
    };

    return(
        <div>
            <Toast ref={toast} position="bottom-right" />

        </div>
    );
}
