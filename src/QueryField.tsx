import { useRef } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_API_URL;
const apiID = import.meta.env.VITE_API_NAME;

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
}

export default function QueryField({ onSearch }: QueryFieldProps) {
  const queryRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!queryRef.current?.value) return;

    const query = queryRef.current?.value as string;
    const params = {
      key: apiKey,
      cx: apiID,
      q: query,
    };

    fetch(url + "?" + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSearch(query, data.items);
      })
      .catch((error) => console.log(error));
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
