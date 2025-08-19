import { Alert } from "@mui/material";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <Alert
      severity="error"
      sx={{
        fontFamily: "monospace",
        width: "fit-content",
        marginTop: "1rem",
      }}
    >
      {message}
    </Alert>
  );
};

export default Error;
