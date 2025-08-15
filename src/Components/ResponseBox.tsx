import { Box, Typography } from "@mui/material";
import type { ResponseProps } from "../types";
import classes from "../styles.module.css";

const ResponseBox = ({ res }: ResponseProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        border: "2px solid  rgba(186, 186, 186, 1);",
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
        className={classes.text}
        sx={{
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
