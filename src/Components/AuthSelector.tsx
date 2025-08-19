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
  token,
}: AuthSelectorProps) => {
  return (
    <>
      <FormControl sx={{ width: "fit-content", minWidth: 140 }}>
        <InputLabel id="input">Authorization</InputLabel>
        <Select
          sx={{
            fontFamily: "monospace",
          }}
          labelId="input"
          defaultValue="Select"
          value={authorization}
          onChange={handleChange}
          label="Authorization"
        >
          {authorization && (
            <MenuItem
              value={""}
              sx={{
                fontFamily: "monospace",
              }}
            >
              None
            </MenuItem>
          )}
          <MenuItem
            value={"Bearer "}
            sx={{
              fontFamily: "monospace",
            }}
          >
            Bearer
          </MenuItem>
          <MenuItem
            value={"Basic "}
            sx={{
              fontFamily: "monospace",
            }}
          >
            Basic
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={token}
        label="Token"
        variant="outlined"
        onChange={(e) => handleToken(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      ></TextField>
    </>
  );
};

export default AuthSelector;
