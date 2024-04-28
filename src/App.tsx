import { useEffect, useState } from "react";
import QueryField, { Result } from "./QueryField";
import ResultsList from "./ResultsList";
import exportFromJSON from "export-from-json";
import Modal from "./Modal";

const SAVING_FORMATS = ["json", "txt", "csv", "xls", "xml", "another"] as const;

type SavingFormat = (typeof SAVING_FORMATS)[number];

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [saveFormat, setSaveFormat] = useState<SavingFormat>("json");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultLoading, setIsResultLoading] = useState(false);

  useEffect(() => {
if (saveFormat === "another") {
    setIsModalOpen(true);
    setSaveFormat("json");
  }}, [saveFormat]);

  const saveResults = (format: SavingFormat) => {
    if (format === "another") {
      return;
    }
    exportFromJSON({ data: results, fileName: query, exportType: format });
  };

  return (
    <>
    <div className="app">
      <h1>SEARCH app</h1>
      <QueryField
        onSearch={(query, results) => {
          setQuery(query);
          setResults(results);
        }}
      />

      <ResultsList results={results} />
      {results.length ? <div className="save-result">
        <button onClick={() => saveResults(saveFormat)}>Save Results</button>
        <p> as </p>
        <select
          value={saveFormat}
          onChange={(e) => setSaveFormat(e.target.value as SavingFormat)}
        >
          {SAVING_FORMATS.map((f, index) => (
            <option key={index} value={f}>{f.toUpperCase()}</option>
          ))}
        </select>
      </div> : null}
    </div>
    <Modal
    isOpen={isModalOpen}
    onClose={() => {
      setIsModalOpen(false);
    }}
  /></>
    
  );
};

export default App;
