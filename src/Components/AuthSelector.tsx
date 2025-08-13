import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { AuthSelectorProps } from "../types";

const AuthSelector = ({
  handleChange,
  handleToken,
  authorization,
}: AuthSelectorProps) => {
  return (
    <>
      <FormControl sx={{ width: "fit-content", minWidth: 140 }}>
        <InputLabel id="input">Authorization</InputLabel>
        <Select
          labelId="input"
          defaultValue="Select"
          value={authorization}
          onChange={handleChange}
          label="Authorization"
        >
          <MenuItem value={"Basic "}>Basic</MenuItem>
          <MenuItem value={"Bearer "}>Bearer</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Token"
        variant="outlined"
        onChange={(e) => handleToken(e.target.value)}
      ></TextField>
    </>
  );
};

export default AuthSelector;
