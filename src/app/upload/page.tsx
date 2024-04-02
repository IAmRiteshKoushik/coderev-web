"use client";
import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
import 'primeicons/primeicons.css';

interface UploadResponse {
    message: string,
}

const Upload = () => {

    const toast = useRef<Toast>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "failed" | "success">("idle");
    const [review, setReview] = useState("Yet to receive a review. Keep Waiting!")

    const alertError = (summary: String, detail: String) => {
        toast.current?.show({
            severity: "error",
            summary: summary,
            detail: detail,
        });
    };

    const alertSuccess = (summary: String, detail: String) => {
        toast.current?.show({
            severity: "success",
            summary: summary,
            detail: detail,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files![0]);
    }

    const getReview = async () => {
        try {
            const response = await fetch('http://localhost:5000/reload', {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                }
            });
            console.log(response);
        } catch (error) {
            alertError("No Review Generated!", "Code Review could not be genereated. Try again!")
            console.log(error);
        }
    }

    const handleUpload = async () => {
        if (!selectedFile){
            alertError("Oops!", "You have not selected any file!")
            return; // Handle no file selected case
        }

        setUploadStatus('uploading');

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post<UploadResponse>('http://localhost:5000/upload', formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });

            setUploadStatus('success');
            alertSuccess("Success", "File upload was successful!");
        } catch (error){
            alertError("Failed!", "Uploading failed! Please try later.")
            setUploadStatus('failed');
            console.log("Upload Failed! " + error);
        }
    }

    return(
        <div className="flex items-center justify-center h-screen rounded-lg m-10 border-2 border-white bg-white">
            <Toast position="bottom-center" ref={toast} />
            <div className="w-1/2">
                <FileUpload
                name="demo[]"
                url={'/api/upload'}
                multiple
                accept="*"
                maxFileSize={1000000}
                emptyTemplate={
                    <p className="m-o">Drag and drop files here to upload.</p>
                }
            ></FileUpload> 
            </div>
            <div className="w-1/2">
                <Button 
                    onClick={getReview}
                    icon="pi pi-eye"
                    label={"Get Review"}
                />
                <div>
                    <h1 className="font-semibold text-2xl">Recommendations</h1>
                </div>
            </div>
            {/*<FileUpload
            <div className="">
                <h1 className="text-semibold text-2xl">Recommendations</h1>
                {review}
            </div>*/}
        </div>
    );
}

export default Upload;
