import { Typography } from "@mui/material";
import type { SavedQueryListProps } from "../types";
import SavedQueryListEntry from "./SavedQueryListEntry";
import classes from "../styles.module.css";

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
          margin: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "#333",
        }}
      >
        Login to save queries.
      </Typography>
    );
  }
  return (
    <div
      className={classes.contentArea}
      style={{
        margin: "16px",
        minHeight: 300,
        maxHeight: 300,
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
