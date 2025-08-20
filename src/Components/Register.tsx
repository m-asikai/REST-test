import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Input, Button } from "@mui/material";
import { useState } from "react";
import { registerAccount } from "../utils";
import Error from "./Error";
import { AxiosError } from "axios";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const register = async () => {
    if (password !== confirmationPassword) {
      setMessage("Passwords don't match.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      try {
        const res = await registerAccount({ user: { username, password } });
        navigate("/");
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          setMessage(e.response?.data?.error);
          setTimeout(() => setMessage(""), 3000);
        }
      }
    }
  };

  const handleUsername = (input: string) => {
    setUsername(input);
  };
  const handlePassword = (input: string) => {
    setPassword(input);
  };
  const handleConPassword = (input: string) => {
    setConfirmationPassword(input);
    if (input.length === password.length && input !== password) {
      setMessage("Passwords don't match.");
      setTimeout(() => setMessage(""), 3000);
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
      }}
    >
      <div
        style={{
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
          onChange={(e) => handleUsername(e.target.value)}
          sx={inputStyle}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e.target.value)}
          sx={inputStyle}
        />
        <Input
          type="password"
          placeholder="Re-enter password"
          onChange={(e) => handleConPassword(e.target.value)}
          sx={inputStyle}
        />
        <Error message={message} />
        <Button onClick={register}>
          <p style={{ fontSize: "20px" }}>Register</p>
        </Button>
        <Link to="/login">
          <p style={{ color: "#1976d2", fontSize: "20px" }}>
            Already have an account? Login here.
          </p>
        </Link>
      </div>
      <p style={{ color: "#d21919ff", fontSize: "20px" }}>
        The backend spins down after inactivity so the server response may be
        slow.
      </p>
    </div>
  );
};

export default Register;
