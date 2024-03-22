import React from 'react';
import CodeViewer from '../_components/CodeViewer';
//import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
//import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import Scrollbars from 'react-scrollbars-custom';

const Page: React.FC = () => {
  const pythonCode = `def greet(name):
    print("Hello, " + name)

greet("World")`;

  const javaCode = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World");
    }
}`;

  return (
    <div className="code-page">
      <h1>Code Viewer</h1>
      <CodeViewer code={pythonCode} language="python" />
      <CodeViewer code={javaCode} language="java" />
    </div>
  );
};

export default Page;
