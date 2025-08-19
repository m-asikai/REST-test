import { Box } from "@mui/material";
import type { Query } from "../types";
import { Typography, Tooltip } from "@mui/material";
import classes from "../styles.module.css";

const QueryListEntry = ({ query, method, url }: Query) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8ff",
        "&:hover": {
          backgroundColor: "#c0dbf5ff",
          cursor: "pointer",
        },
        margin: 1,
        padding: 0.5,
      }}
    >
      <Typography
        variant="body2"
        sx={{ margin: 0, marginBottom: 1 }}
        className={classes.text}
      >
        Method: {method}
      </Typography>
      <Tooltip title={url} arrow>
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
          sx={{
            textAlign: "left",
          }}
        >
          <p style={{ color: "blue" }}>Query:</p>{" "}
          {JSON.stringify(query, null, 1)}
        </Typography>
      )}
    </Box>
  );
};

export default QueryListEntry;
