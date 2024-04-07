"use client"
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import 'primeicons/primeicons.css';
import secureLocalStorage from 'react-secure-storage';

import RepositoryCard from './_components/RepositoryCard';
import { GET_ALL_PROJECTS_URL } from '../_utils/constants';

interface Language {
    name: string,
    code: string,
}

const Dashboard = () => {

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const response = await fetch(GET_ALL_PROJECTS_URL, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${secureLocalStorage.getItem("userAccess")}`,
                    }
                });
                const data = await response.json();
                if (response.status === 200){
                    secureLocalStorage.setItem("projectCount", data["projectCount"]);
                    secureLocalStorage.setItem("projectData", data["projectData"]);
                    return;
                } else if (response.status === 500){
                    alertError("Error", "InternalServerError! Please try again.");
                    return;
                } else {
                    alertError("Error", "Could not handle request. Please try again.");
                    return;
                }
            } catch (error){
                console.log(error);
                return;
            }
        };
        getDashboard();
    }, []); // Calling the function on mount
    
    const toast = useRef<Toast>(null);
    const [fullName, setFullName] = useState(
        secureLocalStorage.getItem("name")
    );
    const [userEmail, setUserEmail] = useState(
        secureLocalStorage.getItem("email")
    );
    const [projectCount, setProjectCount] = useState(
        secureLocalStorage.getItem("projectCount")
    );
    const [projectData, setProjectData] = useState(
        secureLocalStorage.getItem("projectData")
    );
    const [registerToken, setRegisterToken] = useState(
        secureLocalStorage.getItem("userAcces")
    );
    const [visible, setVisible] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState<Language | null>(null);
    const languages: Language[] = [
        { name: "Java", code: ".java" },
        { name: "JavaScript", code: ".js" },
        { name: "Python", code: ".py" },
        { name: "TypeScript", code: ".ts" },
    ]
    const router = useRouter();

    // Getting information out of secureLocalStorage
    useEffect(() => {
        const nameCheck = fullName === secureLocalStorage.getItem("name") && !null;
        const emailCheck = userEmail === secureLocalStorage.getItem("email") && !null;
        const countCheck = projectCount === secureLocalStorage.getItem("projectCount") && !null;
        const dataCheck = projectData === secureLocalStorage.getItem("projectData") && !null;
        if(!nameCheck || !emailCheck || !countCheck || !dataCheck){
            console.log("Problem in data field in the backend");
            secureLocalStorage.clear();
            router.replace("/login");
        }
    }, [fullName, userEmail, projectData, projectCount, router]);

    const alertError = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'error',
            summary: summary,
            detail: detail,
        });
    };

    const alertInfo = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'info',
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

    const handleLogout = async () => {
        secureLocalStorage.clear();
        router.replace("/login");
    }

    const redirectToUpload = () => {
        router.push("/dashboard/new");
    }

    const redirectToEditProfile = () => {
        router.push("/dashboard/editProfile");
    }

    const searchRepositories = async (search: string) => {
        // Logic for searching 
    }

    const filterRepositories = async (tag: string) => {
        // Logic for filtering
    }

    const acceptDeletion = async(projectId: string) => {
        alertInfo("Action In Progress", "Repository deletion in progress");

        try {

        } catch (error){
            alertError("Error!", "Repository deletion failed");
        }
    }
    const rejectDeletion = async() => {
        alertInfo("Action Cancelled!", "Repository deletion cancelled");
        return;
     }

    return(
        <main className='flex'>
            {/* Notification Toast */}
            <Toast position='bottom-center' ref={toast}/>

            {/* Profile Sidebar */}
            <div className='bg-[#F7F9FA] h-screen w-1/5 sicky flex flex-col items-center justify-center'>
                {/* Profile Photo */}
                <Skeleton size="15rem"></Skeleton>
                <div className='w-4/5 flex flex-col items-center justify-center gap-y-2 pb-2'>
                    <p className='antialiased text-2xl pt-2'>{fullName?.toString()}</p>
                    <Button 
                        label="Edit Profile" 
                        icon="pi pi-user-edit" 
                        onClick={redirectToEditProfile}
                        className='w-3/5' 
                    />
                    <p className='w-4/5'>
                        <i className='pi pi-link mr-2' />
                        <span>{userEmail?.toString()}</span>
                    </p>
                    <p className='w-4/5'>
                        <i className='pi pi-database mr-2' />
                        <span>{projectCount + " repositories"}</span>
                    </p>
                </div>
            </div>            
            {/* Projects Display */}
            <div className='bg-white h-screen w-4/5 overflow-scroll'>
                {/* Headers */}
                <div>
                    <h1 className="antialiased text-6xl pt-10 pl-10">Welcome to CodeVet</h1>
                    <h3 className='anitaliased pl-20 py-2'>
                        A place to treat your code without blowing up production.&nbsp;
                        <i className='pi pi-server'/>
                    </h3>
                    <div className='flex items-center justify-center gap-x-2'>
                        <InputText type="text" placeholder='Search Repositories' 
                            className='w-3/5' 
                            disabled={(projectCount == 0) ? true : false}/>
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
                            disabled={(projectCount == 0) ? true : false}
                            showClear
                        />
                        <Button
                            label="New"
                            icon="pi pi-book"
                            onClick={redirectToUpload}
                        ></Button>
                    </div>
                </div>
                {/* RepositoryCards if project exists or no cards */}
                {
                    (projectCount === 0) ? 
                        <div className='m-20 border-2 border-gray-500 rounded-md h-3/5 flex flex-col justify-center items-center gap-y-4'>
                            <p>Ready to start reviewing ? Create a new repository and bring over your code for a health check</p>
                            <Button
                                label="New Repository"
                                icon="pi pi-book"
                                onClick={redirectToUpload}
                            ></Button>
                        </div>
                        : 
                        <div className='flex flex-col items-center justify-center'>
                            {/* projectData.map((project) => (
                                <RepositoryCard 
                                    key={""}
                                    title={project.title}
                                    blurb={project.desc}
                                    tags={project.tags}
                                    time={project.lastUpdate}
                                    callback={() => (setVisible(true))}
                                    openRepo={() => (setVisible(true))}
                                />
                            )) */}                
                        </div>
                }
            </div>
        </main>
    );
}

export default Dashboard;
