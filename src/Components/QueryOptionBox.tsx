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
      <Button
        variant="outlined"
        onClick={props.queryHandler}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Send query
      </Button>
      <Button
        variant="outlined"
        onClick={props.saveQuery}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Save query
      </Button>
      <Button
        variant="outlined"
        onClick={props.handleError}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Errors: {props.error ? "On." : "Off."}
      </Button>
    </>
  );
};

export default QueryOptionBox;
