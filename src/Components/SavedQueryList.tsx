import { Typography } from "@mui/material";
import type { SavedQueryListProps } from "../types";
import SavedQueryListEntry from "./SavedQueryListEntry";

const SavedQueryList = ({
  queries,
  handleClick,
  handleDelete,
}: SavedQueryListProps) => {
  if (queries.length === 0) {
    return (
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: 1.4,
          margin: "auto",
          marginLeft: 1,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "#333",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        No queries saved.
      </Typography>
    );
  }
  return (
    <div
      style={{
        margin: "16px",
        maxHeight: 300,
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {queries.map((query) => (
        <div key={query.id} onClick={() => handleClick(query)}>
          <SavedQueryListEntry
            id={query.id}
            query={query.query}
            method={query.method}
            url={query.url}
            handleDelete={handleDelete}
          />{" "}
        </div>
      ))}
    </div>
  );
};

export default SavedQueryList;
