import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Input, Button } from "@mui/material";
import { useState } from "react";
import { registerAccount } from "../utils";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const navigate = useNavigate();
  const register = async () => {
    if (password !== confirmationPassword) {
      console.log("Passwords don't match");
    } else {
      const res = await registerAccount({ user: { username, password } });
      navigate("/");
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
    }
  };

  const inputStyle = {
    display: "block",
    width: "200px",
    fontSize: "20px",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
        margin: "auto",
        padding: "20px",
        border: "2px",
        borderColor: "#1976d2",
        borderStyle: "solid",
        borderRadius: "16px",
      }}
    >
      <Link to="/">
        <HomeOutlinedIcon
          sx={{
            fontSize: "60px",
            color: "#1976d2",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#c4d8ecff",
            },
          }}
        />
      </Link>
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        sx={inputStyle}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        sx={inputStyle}
      />
      <Input
        type="password"
        placeholder="Re-enter password"
        onChange={(e) => setConfirmationPassword(e.target.value)}
        sx={inputStyle}
      />
      <Button onClick={register}>
        <p style={{ fontSize: "20px" }}>Register</p>
      </Button>
      <Link to="/login">
        <p style={{ color: "#1976d2", fontSize: "20px" }}>
          Already have an account? Login here.
        </p>
      </Link>
    </div>
  );
};

export default Register;
