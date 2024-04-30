import { useState } from "react";
import QueryField, { Result } from "./QueryField";
import ResultsList from "./ResultsList";
import SaveResults from "./SaveResults";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="app">
      <h1>SEARCH app</h1>

      <QueryField
        onSearch={(query, results) => {
          setQuery(query);
          setResults(results);
        }}
        onLoadingResults={(b) => setIsResultLoading(b)}
        onError={(b) => setIsError(b)}
      />

      {isResultLoading && <h2>Hledám...</h2>}

      {isError && <h2>Chyba, něco se pokazilo</h2>}

      {!results || !results.length ? null : (
        <>
          <ResultsList results={results} />
          <SaveResults results={results} query={query} />
        </>
      )}
    </div>
  );
}
