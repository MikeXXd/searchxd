import { FormEvent, useRef } from "react";

const apiKey: string = import.meta.env.VITE_API_KEY;
const url: string = import.meta.env.VITE_API_URL;
const apiID: string = import.meta.env.VITE_API_NAME;

export interface Result {
  displayLink: string;
  title: string;
  snippet: string;
  link: string;
  pagemap: {
    cse_thumbnail?: {
      src?: string;
    }[];
  };
}
interface QueryFieldProps {
  onSearch: (query: string, results: Result[]) => void;
  onLoadingResults: (isLoading: boolean) => void;
  onError: (isError: boolean) => void;
}

export default function QueryField({ onSearch, onLoadingResults, onError }: QueryFieldProps) {
  const queryRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!queryRef.current?.value) return;

    onLoadingResults(true)
    onError(false);

    const query = queryRef.current?.value as string;
    const params = {
      key: apiKey,
      cx: apiID,
      q: query,
    };

    fetch(url + "?" + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        onLoadingResults(false);
        onSearch(query, data.items);
      })
      .catch((error) => {console.log("error:", error.message);
        onError(true);
        onLoadingResults(false);
      });
  }

  return (
    <form onSubmit={onSubmit} className="query-field">
      <input
        ref={queryRef}
        type="search"
        placeholder=" google search"
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
}
