"use client";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeContent {
    lines: string,
    filetype: "Python" | "JavaScript" | "Java" | "Markdown",
    start: number, 
    end: number
}

const CodeViewer = (props: CodeContent): JSX.Element => {

    let highlightList: number[] = [];
    for(let i = props.start; i < props.end + 1; i++){
        highlightList.push(i);
    }

    return(
        <div className='rounded-md'>
            <SyntaxHighlighter language={props.filetype} style={atomOneLight} 
                showLineNumbers
                wrapLongLines
                className="leading-5 text-sm"
                lineProps={lineNumber => {
                    let style = { display: "block", backgroundColor: "#ffffff" };
                    if (highlightList.includes(lineNumber)){
                        style.backgroundColor='#b3f2bb'
                    }
                    return { style };
                }}
            >
                {props.lines}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeViewer;
