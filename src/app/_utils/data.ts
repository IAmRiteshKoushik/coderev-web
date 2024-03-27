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

interface projectItem {
    title: string, 
    desc: string,
    tags: string[],
    lastUpdate: string,
}
  
export const projectData: projectItem[] = [
    {
        title: "coderev-bk",
        desc: "Backend repository for Code Review Automation Tool. Project at Amrita Vishwa Vidyapeetham done in collaboration with SAP Labs.",
        tags: ["Express.js", "Typescript", "AWS"],
        lastUpdate: "Dec 22, 2023"
    },
    {
        title: "coderev-web",
        desc: "UI for Code Review Automation tool created as a project during collaboration between Amrita Vishwa Vidyapeetham and SAP Labs.",
        tags: ["Next.js", "Typescript", "UI"],
        lastUpdate: "May 11, 2023"
    },
    {
        title: "rustup-rk",
        desc: "A repository for all things Rust, Cargo and random experiments for which I am too lazy to create separate repositories",
        tags: ["Rust", "Cargo", "Programming Languages"],
        lastUpdate: "Feb 22, 2024"
    },
    {
        title: "solana-here",
        desc: "Trying out Anchor, sea-level framework on Solana for Rust.",
        tags: ["Rust", "Anchor", "Blockchain"],
        lastUpdate: "Aug 29, 2023"
    },
    {
        title: "hello-zig",
        desc: "A place to store all my Zig code.",
        tags: ["Zig", "Low-level", "Systems-Programming"],
        lastUpdate: "Nov 23, 2023"
    },
    {
        title: "ts-crud-api",
        desc: "Sample testing repository as a reference for writing an API" + 
            " in Node.js, Express.js and Typescript along with" +
            " JWT-Authentication.",
        tags: ["Express.js", "JWT", "Typescript"],
        lastUpdate: "Jan 10, 2024"
    }

];
