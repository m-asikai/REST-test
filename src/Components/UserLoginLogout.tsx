import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

interface UserLoginLogoutProps {
  handleLogOut: () => void;
}

const UserLoginLogout = ({ handleLogOut }: UserLoginLogoutProps) => {
  const token = localStorage.getItem("token");
  return (
    <>
      {!token && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
            mt: 2,
          }}
        >
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/register"
            variant="outlined"
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
            Register
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          mt: 2,
        }}
      >
        {token && <LogOut handleLogOut={handleLogOut} />}
      </Box>
    </>
  );
};

export default UserLoginLogout;
