import { Button, Box, type SelectChangeEvent } from "@mui/material";
import MethodSelector from "./MethodSelector";
import AuthSelector from "./AuthSelector";
import UrlBox from "./UrlBox";

// Prop drilla
interface QueryOptionBoxProps {
  onUrlChange: (value: string) => void;
  handleAuth: (e: SelectChangeEvent) => void;
  handleToken: (token: string) => void;
  handleMethod: (e: SelectChangeEvent) => void;
  queryHandler: () => Promise<void>;
  saveQuery: () => Promise<void>;
  handleError: () => void;
  authorization: string;
  method: string;
  error: boolean;
  url: string;
}

const QueryOptionBox = (props: QueryOptionBoxProps) => {
  const buttonStyle = {
    borderWidth: "3px",
    backgroundColor: "rgb(238, 238, 238, 1)",
    borderColor: "rgba(186, 186, 186, 1)",
    fontFamily: "monospace",
    color: "#333",
    margin: 1,
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          mt: 2,
        }}
      >
        <UrlBox onChange={props.onUrlChange} url={props.url} />
        <AuthSelector
          handleChange={props.handleAuth}
          handleToken={props.handleToken}
          authorization={props.authorization}
        />
      </Box>
      <MethodSelector method={props.method} handleChange={props.handleMethod} />
      <Button variant="outlined" onClick={props.queryHandler} sx={buttonStyle}>
        Send query
      </Button>
      <Button variant="outlined" onClick={props.saveQuery} sx={buttonStyle}>
        Save query
      </Button>
      <Button variant="outlined" onClick={props.handleError} sx={buttonStyle}>
        Errors: {props.error ? "On." : "Off."}
      </Button>
    </>
  );
};

export default QueryOptionBox;
