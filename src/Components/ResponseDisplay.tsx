import { Stack, Box, Alert } from "@mui/material";

import ResponseBox from "./ResponseBox";
import { AxiosError } from "axios";
import classes from "../styles.module.css";
import type { ResponseProps } from "../types";

const ResponseDisplay = ({ res }: ResponseProps) => {
  const resBoxStyle = {
    margin: "auto",
    marginTop: "8px",
    width: "80%",
    maxHeight: 300,
    textAlign: "left",
  };
  if (!res || Object.keys(res).length === 0) {
    return null;
  }
  let message;
  if (res instanceof AxiosError) {
    message = res.status ? res.message : `${res.message}, check your URL.`;
    return (
      <Box sx={resBoxStyle}>
        <Alert
          severity="error"
          sx={{
            fontFamily: "monospace",
            width: "fit-content",
            margin: "auto",
            marginBottom: 1,
          }}
        >
          {message}
        </Alert>
        <ResponseBox res={res} error />
      </Box>
    );
  }
  if (Array.isArray(res.data)) {
    message = res.status;
    return (
      <>
        <Alert
          severity="success"
          sx={{
            fontFamily: "monospace",
            width: "fit-content",
            margin: "auto",
            marginBottom: 1,
          }}
        >
          {message}
        </Alert>
        <Box sx={resBoxStyle} className={classes.contentArea}>
          <Stack>
            {res.data.map((r) => {
              return <ResponseBox res={r} key={crypto.randomUUID()} />;
            })}
          </Stack>
        </Box>
      </>
    );
  }
  message = res.status;
  return (
    <>
      {" "}
      <Alert
        severity="success"
        sx={{
          fontFamily: "monospace",
          width: "fit-content",
          margin: "auto",
          marginBottom: 1,
        }}
      >
        {message}
      </Alert>
      <Box sx={resBoxStyle} className={classes.contentArea}>
        <ResponseBox res={res.data} />
      </Box>
    </>
  );
};

export default ResponseDisplay;
