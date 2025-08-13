import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface SelectorProps {
  handleChange: (e: SelectChangeEvent) => void;
  method: string;
}

const MethodSelector = ({ handleChange, method }: SelectorProps) => {
  const getMethodColor = (methodType: string): string => {
    switch (methodType) {
      case "GET":
        return "green";
      case "POST":
        return "blue";
      case "PUT":
        return "orange";
      case "DELETE":
        return "red";
      default:
        return "inherit";
    }
  };
  return (
    <>
      <FormControl>
        <InputLabel id="input">Method</InputLabel>
        <Select
          labelId="input"
          value={method}
          onChange={handleChange}
          label="Method"
          sx={{
            fontWeight: "bold",
            color: getMethodColor(method),
            "& .MuiSelect-select": {
              color: getMethodColor(method),
            },
          }}
        >
          <MenuItem
            value={"GET"}
            sx={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            GET
          </MenuItem>
          <MenuItem value={"POST"} sx={{ color: "blue", fontWeight: "bold" }}>
            POST
          </MenuItem>
          <MenuItem
            value={"PUT"}
            sx={{
              color: "orange",
              fontWeight: "bold",
            }}
          >
            PUT
          </MenuItem>
          <MenuItem value={"DELETE"} sx={{ color: "red", fontWeight: "bold" }}>
            DELETE
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default MethodSelector;
