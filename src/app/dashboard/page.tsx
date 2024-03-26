"use client"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import 'primeicons/primeicons.css';
import secureLocalStorage from 'react-secure-storage';

interface Language {
    name: string,
    code: string,
}

const Dashboard = () => {

    useEffect(() => {
    }, []);

    const [fullName, setFullName] = useState("Ritesh Koushik");
    const [userEmail, setUserEmail] = useState("riteshkoushik39@gmail.com");
    const [projectCount, setProjectCount] = useState(25);
    const [selectLanguage, setSelectLanguage] = useState<Language | null>(null);
    const languages: Language[] = [
        { name: "Java", code: ".java" },
        { name: "JavaScript", code: ".js" },
        { name: "Python", code: ".py" },
        { name: "TypeScript", code: ".ts" },
    ]

    // Animation states
    const [loadProfile, setLoadProfile] = useState(false);
    const [loadUpload, setLoadUpload] = useState(false);
    const [loadLanguage, setLoadLanguage] = useState(false);

    const router = useRouter();

    const handleLogout = async () => {
        secureLocalStorage.removeItem("currentUser");
        secureLocalStorage.removeItem("userAccess");
        router.replace("/login");
    }

    const redirectToUpload = async () => {
        setLoadUpload(true);
        setTimeout(() => {
            setLoadUpload(false);
            router.push("/dashboard/upload");
        }, 500);
    }

    const redirectToEditProfile = async () => {
        setLoadProfile(true);
        setTimeout(() => {
            setLoadProfile(false);
            router.push("/dashboard/editProfile");
        }, 500);
    }

    const filterRepositories = async (tag: string) => {
        setLoadLanguage(true);
        // Logic for filtering - async/await syntax
    }

    return(
        <main className='flex'>
            {/* Profile Sidebar */}
            <div className='bg-[#F7F9FA] h-screen w-1/5 sicky flex flex-col items-center justify-center'>
                {/* Profile Photo */}
                <Skeleton size="15rem"></Skeleton>
                <div className='w-4/5 flex flex-col items-center justify-center gap-y-2 pb-2'>
                    <p className='antialiased text-2xl pt-2'>{fullName}</p>
                    <Button 
                        label="Edit Profile" 
                        icon="pi pi-user-edit" 
                        loading={loadProfile} 
                        onClick={redirectToEditProfile}
                        className='w-3/5' 
                    />
                    <p className='w-4/5'>
                        <i className='pi pi-link mr-2' />
                        <span>{userEmail}</span>
                    </p>
                    <p className='w-4/5'>
                        <i className='pi pi-database mr-2' />
                        <span>{projectCount + " repositories"}</span>
                    </p>
                </div>
            </div>            
            {/* Projects Display */}
            <div className='bg-slate-100 h-screen w-4/5'>
                <div>
                    <h1 className="antialiased text-6xl pt-10 pl-10">Welcome to CodeVet</h1>
                    <h3 className='anitaliased pl-20 py-2'>
                        A place to treat your code without blowing up production.&nbsp;
                        <i className='pi pi-server'/>
                    </h3>
                    <div className='flex items-center justify-center gap-x-2'>
                        <InputText type="text" placeholder='Search Repositories' className='w-3/5'/>
                        <Dropdown 
                            value={selectLanguage}
                            onChange={(e: DropdownChangeEvent) => {
                                setSelectLanguage(e.value);
                                filterRepositories(e.value);
                            }}
                            options={languages}
                            optionLabel="name"
                            placeholder="Language"
                            className='mx-2 w-48'
                            showClear
                            loading={loadLanguage}
                        />
                        <Button
                            label="New"
                            icon="pi pi-book"
                            loading={loadUpload}
                            onClick={redirectToUpload}
                        ></Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
