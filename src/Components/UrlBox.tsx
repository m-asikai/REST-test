import { TextField } from "@mui/material";
import type { UrlBoxProps } from "../types";

const UrlBox = ({ onChange }: UrlBoxProps) => {
  return (
    <TextField
      label="URL"
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default UrlBox;
