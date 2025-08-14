import { TextField } from "@mui/material";
import type { UrlBoxProps } from "../types";

const UrlBox = ({ onChange, url }: UrlBoxProps) => {
  return (
    <TextField
      label="URL"
      value={url}
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
    />
  );
};

export default UrlBox;
