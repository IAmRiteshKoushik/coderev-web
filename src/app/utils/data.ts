// data.ts

export interface CodeObject {
    title: string;
    filepath: string;
    startline: number;
    endline: number;
  }
  
  export const codeObjects: CodeObject[] = [
    {
      title: "#03",
      filepath: "/path/to/file1",
      startline: 1,
      endline: 10
    },
    {
      title: "#02",
      filepath: "/path/to/file2",
      startline: 5,
      endline: 15
    },
    {
      title: "#03",
      filepath: "/path/to/file3",
      startline: 5,
      endline: 15
    }
  ];
  