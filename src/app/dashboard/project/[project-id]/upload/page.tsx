"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import secureLocalStorage from "react-secure-storage";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";

import FileTree from "../../_components/FileTree";
import { UPLOAD_TO_SERVER_URL } from "@/app/_utils/constants";

const sampleFile: string[] = ["file1.py", "file2.py", "file3.py", "file4.py",
        "file5.py", "file6.py", "file7.py", "file8.py",
        "file9.py", "file10.py", "file11.py", "file12.py",
        "file13.py", "file14.py", "file15.py", "file16.py",
];


const UploadPage = () => {
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

    const handleUpload = async (e: FileUploadHandlerEvent) => {
        const files: File[] | null = e.files;
        let formData = new FormData();

        // File validation
        for(let i = 0; i < files.length; i++){
            console.log(files[i]);
            if(files[i].type !== "text/x-java" && files[i].type !== "text/x-python" && files[i].type !== "text/javascript"){
                alertError("Can't Upload", "Only Python, Java and JavaScript are supported");
                return; 
            } 
            formData.append(files[i].name, files[i]);
        }

        // Actually sending the request
        try {
            const response = await fetch(UPLOAD_TO_SERVER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + secureLocalStorage.getItem("userAccess"),
                },
                body: formData,
            });
            const data = await response.json();
            if(response.status === 200){
                alertSuccess("Upload Success", "Redirecting back to project page.");
                router.back();
                return;
            }
            alertError("Upload Failed", "Please try again.");
        } catch(error){
            alertError("Upload Failed", "Failed to upload ");
        }
    };

    return(
        <main className="flex justify-center items-center">
            <Toast ref={toast} position="bottom-center" />
            <div className="flex w-4/5 border-2 border-black overflow-clip">

                {/* Filetree */}
                <div className="w-1/4 border-2 border-black">
                    <FileTree 
                        active={-1} 
                        files={sampleFile}
                        clickable={false}
                    />
                </div> 

                {/* Upload Component */}
                <div className="flex items-center justify-center w-full h-full scroll-y-scroll">
                    <FileUpload 
                        name="code-files"
                        url={UPLOAD_TO_SERVER_URL}
                        multiple
                        accept=".js, .ts, .java, .py"
                        maxFileSize={5000000}
                        emptyTemplate={
                            <p className="m=0">You can only upload Python, JavaScript and Java files.</p>
                        }
                        customUpload
                        uploadHandler={handleUpload}
                        withCredentials={true}
                    />
                    {/*<input 
                            type="file"
                            accept=".js, .ts, .java, .py"
                            onChange={(e) => { setFiles(e.target.files) }}
                            multiple
                            className="bg-blue-700"
                        />
                        <Button 
                            icon="pi pi-check-circle"
                            label="Confirm" 
                        />
                        <Button 
                            icon="pi pi-times-circle"
                            label="Cancel"
                        />*/}
                </div>

            </div>
        </main>
    );
}

export default UploadPage;
