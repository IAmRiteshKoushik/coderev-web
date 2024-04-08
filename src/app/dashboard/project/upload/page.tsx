"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import secureLocalStorage from "react-secure-storage";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"

import { UPLOAD_TO_SERVER_URL } from "@/app/_utils/constants";

const UploadPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [projectId, setProjectId] = useState(secureLocalStorage.getItem("activeProject"));
    if(projectId === null){
        // Throw user out for clearing cache or tampering with secureLocalStorage
        // Otherwise it cannot be null
        secureLocalStorage.clear();
        router.replace("/login");
    }

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
            formData.append('files', files[i], `${projectId}-${files[i].name}`);
        }
        console.log(formData);

        // Actually sending the request
        try {
            const response = await fetch(UPLOAD_TO_SERVER_URL, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + secureLocalStorage.getItem("userAccess"),
                    "X-Additional-Info-Mail": "" + secureLocalStorage.getItem("email"),
                    "X-Additional-Info-ProjectId": "" + secureLocalStorage.getItem("activeProject"),
                },
                body: formData,
            });
            const data = await response.json();
            if(response.status === 200){
                alertSuccess("Upload Success", "Redirecting back to project page.");
                secureLocalStorage.setItem("files", data.files);
                setTimeout(() => {
                    router.push("/dashboard/project");
                }, 2000);
                return;
            }
            alertError("Upload Failed", "Please try again.");
        } catch(error){
            alertError("Upload Failed", "Failed to upload ");
        }
    };

    return(
        <main className="flex justify-center items-center h-dvh">
            <Toast ref={toast} position="bottom-center" />
            <div className="flex w-4/5 overflow-clip">
                {/* Upload Component */}
                <div className="flex flex-col items-center justify-center w-full h-full gap-y-2">
                    <FileUpload 
                        name="files"
                        url={UPLOAD_TO_SERVER_URL}
                        multiple
                        accept=".js, .ts, .java, .py"
                        maxFileSize={5000000}
                        emptyTemplate={
                            <p className="m=0">You can only upload Python, JavaScript and Java files.<br />
                            If you upload a file whose filename already exists then it will be replaced.</p>
                        }
                        customUpload
                        uploadHandler={handleUpload}
                    />
                    <Button 
                        label="Go Back"
                        onClick={() => router.back()}
                    />
                </div>
            </div>
        </main>
    );
}

export default UploadPage;
