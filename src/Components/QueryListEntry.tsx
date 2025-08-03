import type { Query } from "../types";

const QueryListEntry = ({ query, method, url }: Query) => {
  if (!query) {
    return (
      <div>
        <p>Method: {method}</p>
        <p>Url: {url}</p>
      </div>
    );
  }
  return (
    <div>
      <pre>
        <p>Method: {method}</p>
        <p>Url: {url}</p>
        Query: {JSON.stringify(query, null, 2).slice(1, -1).replaceAll('"', "")}
      </pre>
    </div>
  );
};

export default QueryListEntry;
