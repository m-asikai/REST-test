import { Button, Box } from "@mui/material";

interface LogOutProps {
  handleLogOut: () => void;
}

const LogOut = ({ handleLogOut }: LogOutProps) => {
  const usernameStyle = {
    fontSize: "20px",
    color: "#333",
    textDecoration: "underline",
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <p style={usernameStyle}>{localStorage.getItem("username")}</p>
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
          },
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default LogOut;
