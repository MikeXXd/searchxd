import { useEffect, useState } from "react";
import exportFromJSON from "export-from-json";
import Modal from "./Modal";
import { Result } from "./QueryField";

const SAVING_FORMATS = ["json", "txt", "csv", "xls", "xml", "vlastni"] as const;

type SavingFormat = (typeof SAVING_FORMATS)[number];

interface SaveResultsProps {
  results: Result[];
  query: string;
}

export default function SaveResults({ results, query }: SaveResultsProps) {
  const [saveFormat, setSaveFormat] = useState<SavingFormat>("json");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (saveFormat === "vlastni") {
      setIsModalOpen(true);
      setSaveFormat("json");
    }
  }, [saveFormat]);

  const saveResults = (format: SavingFormat) => {
    if (format === "vlastni") {
      return;
    }
    exportFromJSON({ data: results, fileName: query, exportType: format });
  };

  return (
    <>
      <div className="save-result">
        <button onClick={() => saveResults(saveFormat)}>Save Results</button>
        <p> as </p>
        <select
          value={saveFormat}
          onChange={(e) => setSaveFormat(e.target.value as SavingFormat)}
        >
          {SAVING_FORMATS.map((f, index) => (
            <option key={index} value={f}>
              {f.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
