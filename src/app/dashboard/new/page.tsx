"use client";
import { useRouter } from 'next/navigation';
import { useState, useRef } from "react";
import { z } from "zod";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Messages } from 'primereact/messages';
import { useMountEffect } from 'primereact/hooks';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import secureLocalStorage from 'react-secure-storage';

import { CREATE_PROJECT_URL } from '@/app/_utils/constants';

const NewProject = () => {

    const [repositoryName, setRepositoryName] = useState("");
    const [repositoryDesc, setRepositoryDesc] = useState("");
    const token = secureLocalStorage.getItem("userAccess");

    const msgs = useRef<Messages>(null);
    useMountEffect(() => {
        msgs.current?.clear();
        msgs.current?.show({
            id: '1',
            sticky: true,
            severity: 'info',
            summary: 'Info',
            detail: "CodeVet currently supports only Python, Java, JavaScript"
                + " code. More support coming soon!",
            closable: false,
        });
    })
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

    const alertInfo = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'info',
            summary: summary,
            detail: detail,
        });
    };
    // Validators
    const isValidRepoName = z.string().min(4).max(25).safeParse(repositoryName);
    const isValidDescription = z.string().max(280).safeParse(repositoryDesc);

    const createRepository = async () => {

        // Guard clauses
        if (!isValidRepoName.success){
            alertError('Invalid Repository Name', 'Your repository name should be within 4-25 characters');
            return;
        }
        if (!isValidDescription.success){
            alertError('Description Too Long!', 'Your description must be under 280 characters.')
            return;
        }

        // Throw the user out and ask to login again
        if (token === undefined || token === null){
            alertError("Error", "Browser cache has been cleared!")
            secureLocalStorage.clear();
            router.replace("/login");
            return;
        }
        
        try {
            const response = await fetch(CREATE_PROJECT_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization" : token? "Bearer " + token : "none" 
                },
                body: JSON.stringify({
                    projectName: repositoryName,
                    projectDesc: repositoryDesc,
                    email: secureLocalStorage.getItem("email"),
                }),
            });

            const data = await response.json();
            if (response.status === 200){
                alertSuccess("Repository Created!", "Redirecting to repository page...");
                secureLocalStorage.setItem("projects", data.projects);
                secureLocalStorage.setItem("projectCount", data.projectCount);
                router.back();
            } else if (response.status === 500){
                alertError("Oops!", "Something went wrong! Please try again later!");
            } else if (data.message === undefined || data.message === null){
                alertError("Oops!","Something went wrong! Please try again later");
            } else {
                alertError("Oops!", "Something went wrong! Please try again later");
            }
        } catch(error){
            console.log(error);
            alertError("Oops!", "Something went wrong! Please try again later!");
        }
    };

    return(
        <main className='flex flex-col items-center justify-center bg-slate-100'>
            <Toast position='bottom-center' ref={toast} />
            <div className='w-3/5 bg-white h-screen pt-10 pl-10 pr-10'>
                {/* Headers */}
                <h1 className='font-semibold text-4xl'>Create a new repository</h1>
                <p className='text-wrap w-4/5 my-1 text-gray-500 text-md'>A repository contains all of your project files, code reviews and recommendation history.</p>
                {/* Form */}
                <div className='flex flex-col gap-y-3'>
                    <Messages ref={msgs}/>
                    <div>
                        <h2 className='font-semibold text-base'>Repository Name</h2>
                        <div>
                            <input
                                type="text"
                                placeholder='4-25 Character Names'
                                onChange={(e) => setRepositoryName(e.target.value)}
                                className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" 
                                    + (!isValidRepoName.success && repositoryName ? ' ring-red-500' : isValidRepoName.success && repositoryName ? ' ring-green-500' : ' ring-bGray')}
                                required
                            />
                        </div>
                        <p className='text-gray-500 text-sm'>Great repository names are short and memorable.</p>
                    </div>
                    <div className='flex items-center'>
                        <h2 className='font-semibold text-base'>Description &nbsp;</h2>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder='Descriptions can be 320 characters long'
                            onChange={(e) => setRepositoryDesc(e.target.value)}
                            className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                (!isValidDescription.success && repositoryDesc ? ' ring-red-500' : isValidDescription.success && repositoryDesc ? ' ring-green-500' : ' ring-bGray')}
                            required
                        />
                    </div>
                    <Button
                        label="Create New Repository"
                        severity="success"
                        onClick={createRepository}
                    />
                    <Button
                        label="Cancel"
                        severity="danger"
                        onClick={() => router.push("/dashboard")}
                    />
                </div>
            </div>
        </main>
    );
}

export default NewProject;
