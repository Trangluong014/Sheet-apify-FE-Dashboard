import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Button, Link } from "@mui/material";
import useAuth from "../hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import HelpIcon from "@mui/icons-material/Help";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import { maxWidth } from "@mui/system";

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);
  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!user) return <LoadingScreen />;

  return (
    <Box style={{ marginBottom: 15 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Link
              color="inherit"
              aria-label="menu"
              onClick={() => navigate(`/home`)}
              href="javascript:void(0)"
              style={{ textDecoration: "none", textTransform: "lowercase" }}
            >
              sheets-apify
            </Link>
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                <HelpIcon fontSize="large" />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem key="account" onClick={handleCloseNavMenu}>
                  <Card sx={{ width: 300 }}>
                    <CardContent>
                      <ForumIcon />
                      <Typography color="text.secondary" gutterBottom>
                        Forum
                      </Typography>

                      <Typography
                        sx={{ mb: 1.5, whiteSpace: "normal" }}
                        color="text.secondary"
                      >
                        Ask questions and find answers from Sheets-Apify support
                        staff and other community members
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Visit Forum</Button>
                    </CardActions>
                  </Card>
                </MenuItem>
                <MenuItem key="dashboard" onClick={handleCloseNavMenu}>
                  <Card sx={{ width: 300 }}>
                    <CardContent>
                      <ArticleIcon />
                      <Typography color="text.secondary" gutterBottom>
                        Documentations
                      </Typography>

                      <Typography
                        sx={{
                          mb: 1.5,

                          whiteSpace: "normal",
                        }}
                        color="text.secondary"
                      >
                        Learn how to make the most of your Sheets-Apify sites
                        with details instructions, tips and refference
                        materials.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Visit our docs</Button>
                    </CardActions>
                  </Card>
                </MenuItem>
                <MenuItem key="help" onClick={handleCloseNavMenu}>
                  <Card sx={{ width: 300 }}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Email
                      </Typography>

                      <Typography
                        sx={{ mb: 1.5, whiteSpace: "normal" }}
                        color="text.secondary"
                        variant="body2"
                      >
                        Upgrade to a paid plan to privately email support
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Upgrade</Button>
                    </CardActions>
                  </Card>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name} src={user?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="account"
                  onClick={() => {
                    navigate("/home/user");
                    setAnchorElUser(null);
                  }}
                >
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem
                  key="dashboard"
                  onClick={() => {
                    navigate("/home");
                    setAnchorElUser(null);
                  }}
                >
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem key="help" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Help</Typography>
                </MenuItem>
                <MenuItem key="setting" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Setting</Typography>
                </MenuItem>
                <MenuItem
                  key="logout"
                  onClick={() => {
                    setAnchorElUser(null);
                    logout();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
