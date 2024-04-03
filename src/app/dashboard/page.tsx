"use client"
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import 'primeicons/primeicons.css';
import secureLocalStorage from 'react-secure-storage';

import RepositoryCard from './_component/RepositoryCard';

// Test Data
import { projectData } from '../_utils/data';

interface Language {
    name: string,
    code: string,
}

const Dashboard = () => {

    useEffect(() => {
    }, []);
    
    const toast = useRef<Toast>(null);
    const [fullName, setFullName] = useState("Ritesh Koushik");
    const [userEmail, setUserEmail] = useState("riteshkoushik39@gmail.com");
    const [projectCount, setProjectCount] = useState(secureLocalStorage.getItem("projectCount"));
    const [visible, setVisible] = useState(false);
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
    const router = useRouter();

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
        setLoadUpload(true);
        setTimeout(() => {
            setLoadUpload(false);
            router.push("/dashboard/new");
        }, 500);
    }

    const redirectToEditProfile = () => {
        setLoadProfile(true);
        setTimeout(() => {
            setLoadProfile(false);
            router.push("/dashboard/editProfile");
        }, 500);
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
            {/* Confirm Before Deletion */}
            <ConfirmDialog visible={visible} 
            onHide={() => (setVisible(false))} message="Are you sure you want to proceed?"
            header="Confirmation" icon="pi pi-exclamation-triangle" 
            accept={() => (acceptDeletion("Hello For Now"))}
            reject={rejectDeletion}/>
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
                            loading={loadUpload}
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
                                label="New"
                                icon="pi pi-book"
                                loading={loadUpload}
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
