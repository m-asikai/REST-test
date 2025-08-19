import type { QueryListProps } from "../types";
import QueryListEntry from "./QueryListEntry";
import { Typography } from "@mui/material";
import classes from "../styles.module.css";

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
      className={classes.contentArea}
      style={{
        margin: 16,
        minHeight: 300,
        maxHeight: 300,
        minWidth: 100,
        maxWidth: 300,
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
