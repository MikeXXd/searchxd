import { Result } from "./QueryField";
import web_icon from "./assets/web_100.png";

interface ResultsListProps {
  results: Result[];
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="results-list">
      {results.map((result, index) => (
        <div className="result" key={index}>
          <div className="result-top">
            {result.pagemap &&
            result.pagemap.cse_thumbnail &&
            result.pagemap.cse_thumbnail[0] ? (
              <img src={result.pagemap.cse_thumbnail[0].src} alt={result.title} />
            ) : (
              <img src={web_icon} alt="www icon" />
            )}
            <a href={result.link} className="result-top-left">
              {" "}
              <h2>{result.title}</h2>
              <div className="result-link">
                {removePrefixWWW(result.displayLink)}
              </div>
            </a>
          </div>
          <div className="result-bottom">{result.snippet}</div>
        </div>
      ))}
    </div>
  );
}

function removePrefixWWW(url: string) {
  return url.replace(/^www\./, "");
}
