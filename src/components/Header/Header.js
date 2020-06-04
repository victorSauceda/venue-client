import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
// import Link from "@material-ui/core/Link";
import { Link, useHistory } from "react-router-dom";

import useIsAuthenticated from "../../containers/AuthHook";

const styles = (theme) => ({
  toolbarRoot: {
    paddingRight: 24,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
});
// interiew with coldwar
const Header = (props) => {
  const history = useHistory();
  const { classes, handleToggleDrawer } = props;
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { isAuthenticated, userHasAuthenticated } = useState(false);
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const resp = await Auth.currentSession();

      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "NO current user") {
      }
    }
    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    // return <Redirect to="/login" />;
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <AppBar position="fixed">
        <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleToggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" noWrap className={classes.title}>
            <Link color="default" to="/">
              Venue
            </Link>
          </Typography>
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {" "}
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "cursive",
                fontSize: "2.5rem",
              }}
              color="primary"
              to="/cart"
            >
              Cart
            </Link>
          </Typography>
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {" "}
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "cursive",
                fontSize: "2.5rem",
              }}
              color="primary"
              to="/admin"
            >
              Admin
            </Link>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
          {isAuthenticated ? (
            <>
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {" "}
                <Link color="inherit" to="/settings">
                  Settings
                </Link>
              </Typography>
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </>
          ) : (
            <>
              <Link color="inherit" to="/signup">
                Sign Up
              </Link>
              <Link
                color="inherit"
                to={{
                  search: "?foo=bar",
                  pathname: "/login",
                  state: {
                    setIsAuthenticated: true,
                  },
                }}
              >
                Login
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    )
  );
};

export default withStyles(styles)(Header);
