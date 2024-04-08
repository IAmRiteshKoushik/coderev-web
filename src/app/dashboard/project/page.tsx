"use client"
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CodeViewer from "../_components/CodeViewer";
import secureLocalStorage from "react-secure-storage";
import { GET_FILE_CONTENTS, GET_PROJECT_URL, 
    CREATE_PROJECT_REVIEW_URL, 
    CHECK_PROJECT_REVIEW_URL } from "@/app/_utils/constants";
import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/lara-light-blue/theme.css"
import 'primeicons/primeicons.css';

// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import ReactMarkdown from "react-markdown";

const RepositoryPage = () => {

    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [startLineValue, setStartLineValue] = useState<number>(0);
    const [endLineValue, setEndLineValue] = useState<number>(0);
    
    const [files, setFiles] = useState<any[] | null>(null); // Will receive the file
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileId, setFileId] = useState<string>("");
    const [reviewData, setReviewData] = useState("Select a file to see recommendations");
    const [reviewStatus, setReviewStatus] = useState<"not available" | "pending" | "done">("not available")
    const [fileContent, setFileContent] = useState<string>("\"\"\"Select a file to see contents\"\"\"");


    useEffect(() => {
        // Bring all the files from projectId         
        const fetchFiles = async () => {
            try {
                const response = await fetch(GET_PROJECT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${secureLocalStorage.getItem("userAccess")}`,
                    },
                    body: JSON.stringify({
                        projectId: secureLocalStorage.getItem("activeProject"),
                    }),
                });
                const data = await response.json();
                const filesTemp = [];
                if(response.status === 200){
                    for(let i: number = 0; i < data["fileData"].length; i++){
                        filesTemp.push({
                            id: data["fileData"][i]["id"],
                            name: data["fileData"][i]["name"].split("-").slice(1).join(""),
                        });
                    }
                    setFiles(filesTemp);
                } else {
                    console.log("Response did not come", response.status);
                }
            } catch (error){
                console.log(error);
            }
        }
        fetchFiles();
    }, []);

    const alertInfo = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'info',
            summary: summary,
            detail: detail,
        });
    };

    const alertError = (summary: string, detail: string) => {
        toast.current?.show({
            severity: 'error',
            summary: summary,
            detail: detail,
        });
    };

    const getFileData = async(fileId: string) => {
        try {
            const response = await fetch(GET_FILE_CONTENTS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${secureLocalStorage.getItem("userAccess")}`
                },
                body: JSON.stringify({
                    fileId: fileId
                }),
            });
            const data = await response.json();
            if(response.status === 200){
                setFileName(data["fileName"].split("-").slice(1).join(""));
                setReviewStatus(data.reviewStatus);
                setReviewData(data.reviewData);
                setFileContent(data.fileContent);
                setFileId(data.id);
                return;
            } else {
                alertError("Oops!", data.message)
                return;
            }
        } catch (error){
            console.log(error);
            alertError("Oops!", "Could not redirect you to the repository");
            return;
        }
    }

    // Both need projectId to get the codeReviewARN
    const applyForReview = async() => {
        try {
            const response = await fetch(CREATE_PROJECT_REVIEW_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${secureLocalStorage.getItem("userAccess")}`
                },
                body: JSON.stringify({
                    projectId: secureLocalStorage.getItem("activeProject"),
                }),
            });
            const data = await response.json();
            if(response.status === 200){
                alertInfo("Success", "CodeReview is in progress. Please wait for a while.");
                setReviewStatus("pending");
                return;
            } else {
                alertError("Oops!", "There seems to be a problem");
            }
        } catch (error){
            alertError("Oops!", "Could not apply for a code review");
        }
    }

    const checkForReview = async(id: string) => {
        try {
            const response = await fetch(CHECK_PROJECT_REVIEW_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${secureLocalStorage.getItem("userAccess")}`
                },
                body: JSON.stringify({
                    fileId: id,
                    email: secureLocalStorage.getItem(""),
                    projectId: secureLocalStorage.getItem("activeProject"),
                    reviewStatus: "pending",
                }),
            });
            const data = await response.json();
            if(response.status === 200){
                setFileId(data.fileId);
                setFileName(data.fileName);
                setFileContent(data.fileContent);
                setReviewStatus(data.reviewStatus);
                setReviewData(data.fileReviewContent);
                alertInfo("CodeReview Complete", "The code review has been completed");
            }
        } catch (error){
            console.log(error);
            alertError("Oops!", "Could not check if the review exists.")
        }
    }

    return(
        <main className="h-screen">
            <Toast ref={toast}/>
            {/* Workspace */}
            <div className="flex gap-x-2 h-dvh">
                {/* Filetree */} <div className="px-2 pt-2">
                    <Button 
                        severity="warning"
                        label="Add Files"
                        onClick={() => router.push("/dashboard/project/upload/")}
                    />
                    <div className="mt-4 flex flex-col gap-y-2">
                        {files?.map((file: any) => (
                            <Button 
                                icon="pi pi-file-edit"
                                key={file.id}
                                severity="info"
                                label={file.name}
                                onClick={() => getFileData(file.id)}
                            />
                        ))}
                    </div>
                </div>
                {/* Viewers */}
                <div className="flex flex-1 rounded-md space-x-3">
                    <div className="w-1/2 border-2 border-gray-300 overflow-hidden">
                        <div className="p-1 text-md font-semibold flex gap-x-2">
                            <p className="flex items-center justify-center ml-5 w-4/5">{fileName ? fileName : "No File Selected"}</p>
                            <div className="w-1/5">
                                {(reviewStatus === "not available") 
                                    ? <Button 
                                        icon="pi pi-search"
                                        severity="info"
                                        disabled={false}
                                        label="Get Review"
                                        onClick={applyForReview}
                                    /> 
                                    : (reviewStatus === "pending") 
                                    ? <Button 
                                            icon="pi pi-file-edit"
                                            disabled={false}
                                            severity="info"
                                            label="Get Report"
                                            onClick={() => checkForReview(fileId)}
                                        />
                                    : <Button 
                                            icon="pi pi-file-edit"
                                            disabled={true}
                                            severity="info"
                                            label="Get Report"
                                        />
                                }
                            </div>
                        </div>
                        <div className="w-full overflow-y-scroll h-full">
                            {/* Displaying file-contents */}
                            <CodeViewer 
                                lines={fileContent}
                                filetype={"Python"}
                                start={startLineValue}
                                end={endLineValue}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 border-2 overflow-hidden">
                        <div className="p-1 text-md font-semibold flex gap-x-2">
                            <p className="flex items-center justify-center ml-5 w-4/5">File Review</p>
                            <div className="w-1/5">
                                <Button
                                    icon="pi pi-arrow-left"
                                    severity="warning"
                                    label="Dashboard"
                                    onClick={() => (router.push("/dashboard"))}
                                />
                            </div>
                        </div>
                        <div className="w-full h-full overflow-auto">
                            {/* Displaying recommendations */}
                            <CodeViewer 
                                lines={reviewData}
                                filetype={"Markdown"}
                                start={startLineValue}
                                end={endLineValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RepositoryPage;
