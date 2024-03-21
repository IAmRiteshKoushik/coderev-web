// pages/index.tsx
import CodeObjectComponent from "../components/CodeObjectComponents";
import { codeObjects } from "../utils/data";

const HomePage = () => {
  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      {codeObjects.map((codeObject, index) => (
        <CodeObjectComponent key={index} codeObject={codeObject} />
      ))}
      
    </div>
  );
};

export default HomePage;