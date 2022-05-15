import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "@mui/material";
import useAuth from "../hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);
;

  let navigate = useNavigate();

  if (!user?.user) return <LoadingScreen />

  return (
    <Box style={{ marginBottom: 15 }}>
      <AppBar position="static">
        <Toolbar style={{ display:"flex", justifyContent: "space-between" }}>
          <Box>
            <Link
              color="inherit"
              aria-label="menu"
              onClick={() => navigate(`/`)}
              href="javascript:void(0)"
              style={{ textDecoration: "none", textTransform: "lowercase" }}
            >
              sheets-apify
            </Link>
          </Box>

          <Box display="inline-flex" alignItems="center">
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {isAuthenticated ? `${user?.user?.name}` : ""}
            </Typography>
            <Tooltip title={isAuthenticated ? "Sign Out" : `Sign In`}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  return isAuthenticated ? logout() : null;
                }}
              >
                {isAuthenticated ? (
                  <LogoutIcon />
                ) : (
                  <Link to={`/login`}>
                    <LoginIcon />{" "}
                  </Link>
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
