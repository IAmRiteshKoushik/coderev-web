"use client"
import "../../globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CodeObject } from "../../utils/data";
import DataDisplayComponent from "./DataDisplayComponent";

interface CodeObjectProps {
  codeObject: CodeObject;
}

const CodeObjectComponent: React.FC<CodeObjectProps> = ({ codeObject }) => {
  const router = useRouter();
  const [showData, setShowData] = useState(false);

  const handleClick = () => {
    // Redirect to a new page
    router.push("/newpage");
  };

  return (
    <div className="mt-4 mb-4 flex">
      <div className="bg-black p-4 rounded-lg shadow-md border border-white">
        <h1 className="text-lg font-bold mb-2">SnippetReviewId: {codeObject.title}</h1>
        <p>Filepath: {codeObject.filepath}</p>
        <p>Startline: {codeObject.startline}</p>
        <p>Endline: {codeObject.endline}</p>
        <button
          onClick={() => setShowData(!showData)}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-sm"
        >
          {showData ? "Hide Data" : "Show Data"}
        </button>
      </div>
      {showData && <DataDisplayComponent codeObject={codeObject} />}
    </div>

    
  );
};

export default CodeObjectComponent;