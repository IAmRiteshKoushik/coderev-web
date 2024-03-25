'use client'
import React, { useState } from 'react';

const CodeViewer = () => {
  const [reviewedLines, setReviewedLines] = useState<number[]>([]);
  const [startLine, setStartLine] = useState('');
  const [endLine, setEndLine] = useState('');

  const handleReview = () => {
    const start = parseInt(startLine);
    const end = parseInt(endLine);
    if (!isNaN(start) && !isNaN(end) && start >= 1 && end <= 5) {
      const linesToReview = Array.from({ length: end - start + 1 }, (_, index) => start + index);
      setReviewedLines(linesToReview);
    } else {
      alert('Invalid line numbers. Please enter valid line numbers.');
    }
  };

  return (
    <div className="min-h-screen bg-notebook bg-no-repeat bg-cover flex flex-col justify-between">
      <header className="py-4 bg-gray-800 text-white text-center">
        <h1 className="text-3xl font-bold mb-8">Code Viewer</h1>
      </header>
      <div className="container mx-auto py-8 flex-grow flex justify-center items-center">
        <div className="w-1/2 bg-white shadow-md p-4 relative">
          <pre className="overflow-auto h-full p-4 relative">
            <code className="text-gray-800">
              {`
1  # Sample Python Code
2  def greet(name):
3      print("Hello, " + name + "!")
4  
5  greet("World")`}
            </code>
          </pre>
          <div className="absolute top-0 right-0 p-4">
            <div className="flex mb-4">
              <label htmlFor="startLine" className="mr-2">Start Line:</label>
              <input
                id="startLine"
                type="number"
                value={startLine}
                onChange={(e) => setStartLine(e.target.value)}
                className="border-gray-300 border rounded p-1"
              />
            </div>
            <div className="flex mb-4">
              <label htmlFor="endLine" className="mr-2">End Line:</label>
              <input
                id="endLine"
                type="number"
                value={endLine}
                onChange={(e) => setEndLine(e.target.value)}
                className="border-gray-300 border rounded p-1"
              />
            </div>
            <button onClick={handleReview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Review
            </button>
          </div>
        </div>
      </div>
      <footer className="py-4 bg-gray-800 text-white text-center">
        <p>CODE REVIEWER</p>
      </footer>
    </div>
  );
};

export default CodeViewer;
