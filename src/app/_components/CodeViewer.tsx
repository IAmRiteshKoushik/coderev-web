import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Scrollbar from 'react-scrollbars-custom'; // Import Scrollbar from 'react-scrollbars-custom'

interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  return (
    <div className="code-viewer">
      {/* Scrollbar component as a wrapper */}
     
        {/* SyntaxHighlighter component */}
        <SyntaxHighlighter language={language} style={darcula} showLineNumbers wrapLines>
          {code}
        </SyntaxHighlighter>
     
    </div>
  );
};

export default CodeViewer;
