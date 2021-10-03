import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./ExperimentalHeader.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { ButtonBase } from "@mui/material";

export default function ButtonAppBar() {
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shoutouts
          </Typography>
          {user ? (
            <div className="signed-in">
              <p>{user.displayName}</p>
              <ButtonBase onClick={signOut}>Sign Out</ButtonBase>
            </div>
          ) : (
            <div className="signed-out">
              <Button
                color="inherit"
                variant="outlined"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
            </div>
          )}

          {/* <Button color="inherit" onClick={signInWithGoogle}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
