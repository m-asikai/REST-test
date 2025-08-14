import type { QueryListProps } from "../types";
import QueryListEntry from "./QueryListEntry";
import { Typography } from "@mui/material";

const QueryList = ({ queries, handleClick }: QueryListProps) => {
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
        No query history.
      </Typography>
    );
  }
  return (
    <div
      style={{
        margin: "16px",
        marginRight: 16,
        maxHeight: 300,
        maxWidth: 100,
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {queries.map((query) => (
        <div key={query.id} onClick={() => handleClick(query)}>
          <QueryListEntry
            id={query.id}
            query={query.query}
            method={query.method}
            url={query.url}
          />{" "}
        </div>
      ))}
    </div>
  );
};

export default QueryList;
