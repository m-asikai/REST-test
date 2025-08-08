import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const login = (e: React.FormEvent<HTMLButtonElement>) => {
    console.log(username, password);
    e.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)}></input>
      <input onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={login}>LOGIN</button>
    </div>
  );
};

export default Login;
