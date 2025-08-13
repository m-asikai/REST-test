import { Button } from "@mui/material";

interface LogOutProps {
  handleLogOut: () => void;
}

const LogOut = ({ handleLogOut }: LogOutProps) => {
  const usernameStyle = {
    width: "fit-content",
    padding: "8px",
    fontSize: "20px",
    backgroundColor: "#b9dcfeff",
    color: "white",
    borderRadius: "8px",
    margin: "auto",
    marginTop: "8px",
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleLogOut}
        sx={{
          borderColor: "#1976d2",
          color: "#1976d2",
          fontWeight: "bold",
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: "none",
          borderWidth: 2,
          "&:hover": {
            backgroundColor: "#e3f2fd",
            borderWidth: 2,
          },
        }}
      >
        Log Out
      </Button>
      <p style={usernameStyle}>{localStorage.getItem("username")}</p>
    </>
  );
};

export default LogOut;
