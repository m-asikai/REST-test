import type { QueryListProps } from "../types";
import QueryListEntry from "./QueryListEntry";

const QueryList = ({ queries, handleClick }: QueryListProps) => {
  return (
    <div>
      <ul>
        {queries.map((query) => (
          <li key={query.id} onClick={() => handleClick(query)}>
            <QueryListEntry
              id={query.id}
              query={query.query}
              method={query.method}
              url={query.url}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryList;
