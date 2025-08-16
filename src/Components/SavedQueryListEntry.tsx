import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { SavedQuery } from "../types";
import ClearIcon from "@mui/icons-material/Clear";
import classes from "../styles.module.css";

const SavedQueryListEntry = ({
  query,
  method,
  url,
  handleDelete,
  id,
}: SavedQuery) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#f0f4f8ff",
        "&:hover": {
          backgroundColor: "#c0dbf5ff",
          cursor: "pointer",
        },
        borderRadius: 1,
        margin: 1,
        padding: 0.5,
        paddingRight: 5,
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
      >
        <ClearIcon />
      </IconButton>
      <Typography
        variant="body2"
        sx={{ margin: 0, marginBottom: 1 }}
        className={classes.text}
      >
        Method: {method}
      </Typography>
      <Tooltip title={url}>
        <Typography
          variant="body2"
          className={classes.text}
          sx={{
            [`&.${classes.text}`]: {
              margin: 1,
              marginBottom: 1,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            },
          }}
        >
          Url: {url}
        </Typography>
      </Tooltip>
      {query && (
        <Typography
          component="pre"
          variant="body2"
          className={classes.text}
          sx={{ textAlign: "left", color: "blue" }}
        >
          <p>Query:</p> {JSON.stringify(query, null, 1)}
        </Typography>
      )}
    </Box>
  );
};

export default SavedQueryListEntry;
