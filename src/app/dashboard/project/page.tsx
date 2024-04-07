"use client"
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CodeViewer from "../_components/CodeViewer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import secureLocalStorage from "react-secure-storage";
import rehypeRaw from "rehype-raw";

const RepositoryPage = () => {

    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [startLineValue, setStartLineValue] = useState<number>(0);
    const [endLineValue, setEndLineValue] = useState<number>(0);
    
    const [files, setFiles] = useState(null); // Will receive the file
    const [fileName, setFileName] = useState(null);
    const [reviewData, setReviewData] = useState("");
    const [reviewStatus, setReviewStatus] = useState<"not available" | "pending" | "done">("not available")
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
        
    }, []);

    return(
        <main className="h-screen">
            <Toast ref={toast}/>
            {/* Filetree */}

            {/* Workspace */}
            <div className="flex gap-x-2 h-dvh">
                {}
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
                                    /> 
                                    : (reviewStatus === "pending") 
                                    ? <Button 
                                            icon="pi pi-file-edit"
                                            disabled
                                            severity="info"
                                            label="Get Report"
                                        />
                                    : <Button 
                                            icon="pi pi-file-edit"
                                            severity="info"
                                            label="Get Report"
                                        />
                                }
                            </div>
                        </div>
                        <div className="w-full overflow-y-scroll h-5/6">
                            {/*  */}
                            {}
                            <CodeViewer 
                                lines={sampleCodeLines}
                                filetype={"Python"}
                                start={startLineValue}
                                end={endLineValue}
                            />
                        </div>
                        {/* Selecting Snippet Reviews */}
                        {/*<div className="flex items-center justify-center bg-[#DADFE0] p-2 gap-x-2">
                            <div className="flex-auto">
                                <label htmlFor="start-line" className="font-bold block md-2">Start Line</label>
                                <InputNumber 
                                    value={startLineValue}
                                    onValueChange={(e: InputNumberValueChangeEvent) => setStartLineValue(e.value ? e.value : 0)}
                                    showButtons
                                    buttonLayout="horizontal"
                                    step={1}
                                    incrementButtonIcon="pi pi-plus"
                                    incrementButtonClassName="p-button-info"
                                    decrementButtonIcon="pi pi-minus"
                                    decrementButtonClassName="p-button-info"
                                    min={0}
                                    max={100}
                                    mode="decimal"
                                />
                            </div>
                            <div className="flex-auto">
                                <label htmlFor="start-line" className="font-bold block md-2">End Line</label>
                                <InputNumber 
                                    value={endLineValue}
                                    onValueChange={(e: InputNumberValueChangeEvent) => setEndLineValue(e.value ? e.value : 0)}
                                    showButtons
                                    buttonLayout="horizontal"
                                    step={1}
                                    incrementButtonIcon="pi pi-plus"
                                    incrementButtonClassName="p-button-info"
                                    decrementButtonIcon="pi pi-minus"
                                    decrementButtonClassName="p-button-info"
                                    min={0}
                                    max={100}
                                    mode="decimal"
                                    className="w-2/5"
                                />
                            </div>
                            <div className="flex-auto">
                                <Button 
                                    icon="pi pi-eye"
                                    severity="info"
                                    label="Review Snippet"
                                    disabled={startLineValue === 0 || endLineValue === 0 || startLineValue > endLineValue}
                                ></Button>
                            </div>
                        </div> */}
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
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]} 
                                rehypePlugins={[rehypeRaw]}
                                className='markdown'>
                                {sampleReviewLines.join("\n")}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RepositoryPage;
