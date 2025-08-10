import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";

interface AuthSelectorProps {
  handleChange: (e: SelectChangeEvent) => void;
  handleToken: (token: string) => void;
  authorization: string;
}

const AuthSelector = ({
  handleChange,
  handleToken,
  authorization,
}: AuthSelectorProps) => {
  return (
    <>
      <FormControl sx={{ width: "fit-content", minWidth: 120 }}>
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
        <TextField
          label="Token"
          variant="outlined"
          onChange={(e) => handleToken(e.target.value)}
        ></TextField>
      </FormControl>
    </>
  );
};

export default AuthSelector;
