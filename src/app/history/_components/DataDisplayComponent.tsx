import { CodeObject } from "../../utils/data";

interface DataDisplayProps {
  codeObject: CodeObject;
}

const DataDisplayComponent: React.FC<DataDisplayProps> = ({ codeObject }) => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md border border-white">
      <h2 className="text-lg font-bold mb-2">Data of Review</h2>
      <p>{codeObject.data}</p>
    </div>
  );
};

export default DataDisplayComponent;
