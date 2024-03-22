"use client"
import "../globals.css";
import { useRouter } from "next/navigation";
import { CodeObject } from "../utils/data";

interface CodeObjectProps {
  codeObject: CodeObject;
}

const CodeObjectComponent: React.FC<CodeObjectProps> = ({ codeObject }) => {
  const router = useRouter();

  const redirectToNewPage = () => {
    // Redirect to a new page
    router.push("/newpage");
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <div>
      <div style={{ backgroundColor: "black", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", border: "1px solid white" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>SnippetReviewId: {codeObject.title}</h1>
      <p>Filepath: {codeObject.filepath}</p>
      <p>Startline: {codeObject.startline}</p>
      <p>Endline: {codeObject.endline}</p>
      </div>
      
      <button style={{ backgroundColor: "#34D399", color: "white", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "0.25rem" }} onClick={redirectToNewPage}>Redirect to New Page</button>
    </div>
    </div>
    
  );
};

export default CodeObjectComponent;