import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@mui/material";

const Logout = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <Button variant="contained" color="secondary" onClick={signOut}>
      Sign out
    </Button>
  );
};

export default Logout;
