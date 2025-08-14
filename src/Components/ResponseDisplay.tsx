import { Stack, Box } from "@mui/material";
import type { ResponseProps } from "../types";
import ResponseBox from "./ResponseBox";
import { AxiosError } from "axios";

const ResponseDisplay = ({ res }: ResponseProps) => {
  if (!res || Object.keys(res).length === 0) {
    return null;
  }
  if (res instanceof AxiosError) {
    return <ResponseBox res={res.response} />;
  }
  if (Array.isArray(res)) {
    return (
      <Box
        sx={{
          margin: "auto",
          marginTop: "8px",
          width: "100%",
          maxHeight: 200,
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Stack
          sx={{
            border: "3px solid #1976d2",
            borderRadius: 1,
            alignItems: "center",
            padding: 2,
            backgroundColor: "#cfdce8ff",
          }}
        >
          {res.map((r, index) => {
            return <ResponseBox res={r} key={index} />;
          })}
        </Stack>
      </Box>
    );
  }
  return <ResponseBox res={res} />;
};

export default ResponseDisplay;
