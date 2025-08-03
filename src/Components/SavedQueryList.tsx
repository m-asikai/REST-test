import type { SavedQueryListProps } from "../types";
import SavedQueryListEntry from "./SavedQueryListEntry";

const SavedQueryList = ({
  queries,
  handleClick,
  handleDelete,
}: SavedQueryListProps) => {
  return (
    <div>
      <ul>
        {queries.map((query) => (
          <li key={query.id} onClick={() => handleClick(query)}>
            <SavedQueryListEntry
              id={query.id}
              query={query.query}
              method={query.method}
              url={query.url}
              handleDelete={handleDelete}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedQueryList;
