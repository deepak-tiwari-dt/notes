import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@mui/material";

const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};

export default Login;
