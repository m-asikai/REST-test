import { Box, Typography } from "@mui/material";
import type { ResponseProps } from "../types";

const ResponseBox = ({ res }: ResponseProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        border: "2px solid #1976d2",
        borderRadius: 2,
        boxSizing: "content-box",
        width: "80%",
        padding: 0.5,
        paddingBottom: 2,
        margin: "auto",
        marginBottom: 1,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": {
          backgroundColor: "#c0dbf5ff",
        },
      }}
    >
      <Typography
        component="pre"
        sx={{
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: 1.4,
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "#333",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        {JSON.stringify(res, null, 2).slice(1, -1)}
      </Typography>
    </Box>
  );
};

export default ResponseBox;
