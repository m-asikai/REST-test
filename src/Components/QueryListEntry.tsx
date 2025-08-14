import { Box } from "@mui/material";
import type { Query } from "../types";
import { Typography, Tooltip } from "@mui/material";

const QueryListEntry = ({ query, method, url }: Query) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8ff",
        "&:hover": {
          backgroundColor: "#c0dbf5ff",
        },
        margin: 1,
        padding: 0.5,
      }}
    >
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

export default QueryListEntry;
