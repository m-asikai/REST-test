import type { SavedQuery } from "../types";

const SavedQueryListEntry = ({
  query,
  method,
  url,
  handleDelete,
  id,
}: SavedQuery) => {
  return (
    <>
      <p>Method: {method}</p>
      <p>Url: {url}</p>
      {query && (
        <pre>
          Query:{" "}
          {JSON.stringify(query, null, 2).slice(1, -1).replaceAll('"', "")}
        </pre>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
      >
        DELETE
      </button>
    </>
  );
};

export default SavedQueryListEntry;
