import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { SavedQuery } from "../types";
import ClearIcon from "@mui/icons-material/Clear";

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
      <Typography variant="body2" sx={{ margin: 0, marginBottom: 1 }}>
        Method: {method}
      </Typography>
      <Tooltip title={url}>
        <Typography
          variant="body2"
          sx={{
            margin: 1,
            marginBottom: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          Url: {url}
        </Typography>
      </Tooltip>
      {query && (
        <Typography
          component="pre"
          variant="body2"
          sx={{
            margin: 0,
            fontFamily: "monospace",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          Query:{" "}
          {JSON.stringify(query, null, 2).slice(1, -1).replaceAll('"', "")}
        </Typography>
      )}
    </Box>
  );
};

export default SavedQueryListEntry;
