"use client";

import { REGISTER_VERIFY_URL } from '../../utils/constants';
import React, { useState, useRef, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import Link from "next/link";

import 
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"

export default function verifyPage(){
    
    const toast = useRef<Toast>(null);

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const otpRegex = /^[0-9]{6}/;
    const isValidOtp = otp.length === 6 && otpRegex.test(otp.join());

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerToken, setRegisterToken] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setRegisterEmail(secureLocalStorage.getItem("registerEmail"));
        setRegisterToken(secureLocalStorage.getItem("registerToken"));
    }, []);

    const handleVerify = async (e: MouseEvent) => {
        e.preventDefault();
        const otpString = otp.join();



        try{

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
