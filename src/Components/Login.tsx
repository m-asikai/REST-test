import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { loginAccount } from "../utils";
import { AxiosError } from "axios";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const login = async (
    e: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    try {
      const res = await loginAccount({ user: { username, password } });
      if (res.token && res.username) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        navigate("/");
      } else {
        throw new Error("Something went wrong in the response.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("Axios error:", error.response?.data?.error);
        console.log("Status:", error.response?.status);
      } else if (error instanceof Error) {
        console.log("Error message:", error.message);
      } else {
        console.log("Unknown error:", error);
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
