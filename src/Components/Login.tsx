import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { loginAccount } from "../utils";
import { AxiosError } from "axios";
import Error from "./Error";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const login = async (
    e: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (!username) {
      setMessage("Enter username.");
      setTimeout(() => setMessage(""), 3000);
    } else if (!password) {
      setMessage("Enter password.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      try {
        const res = await loginAccount({ user: { username, password } });
        if (res.token && res.username) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          navigate("/");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setMessage(error.response?.data?.error);
          setTimeout(() => setMessage(""), 3000);
        }
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      login(e);
    }
  };

  const inputStyle = {
    display: "block",
    width: "200px",
    fontSize: "20px",
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onKeyDown={handleEnter}
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
      <Error message={message} />
      <Button onClick={login}>
        {" "}
        <p
          style={{
            color: "#1976d2",
            fontSize: "20px",
            margin: "8px 0px 8px 0px",
          }}
        >
          Login
        </p>
      </Button>
      <Link to={"/register"}>
        <p style={{ color: "#1976d2", fontSize: "20px" }}>
          No account? Register here.
        </p>
      </Link>
    </div>
  );
};

export default Login;
