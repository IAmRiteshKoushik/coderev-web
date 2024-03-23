// data.ts

export interface CodeObject {
    title: string;
    filepath: string;
    startline: number;
    endline: number;
    data: string;
  }
  
  export const codeObjects: CodeObject[] = [
    {
      title: "#03",
      filepath: "/path/to/file2",
      startline: 1,
      endline: 10,
      data: "Data of review: 3"
    },
    {
      title: "#02",
      filepath: "/path/to/file2",
      startline: 5,
      endline: 15,
      data: "Data of review: 2"
    },
    {
      title: "#01",
      filepath: "/path/to/file1",
      startline: 5,
      endline: 15,
      data: "Data of review: 1"
    }
  ];
  