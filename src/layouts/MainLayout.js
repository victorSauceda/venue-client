import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,

    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 7,
    overflowX: "hidden"
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class MainLayout extends Component {
  state = {
    open: false
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  render() {
    const { classes, children, appProps } = this.props;
    // console.log("lay out props:", this.props);
    return (
      <Fragment>
        <div className={classes.root}>
          <Header appProps handleToggleDrawer={this.handleToggleDrawer} />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: this.state.open
            })}
          >
            {children}
          </main>
        </div>
        {/* <Sidebar open={this.state.open} drawerWidth={drawerWidth} /> */}
      </Fragment>
    );
  }
}

export default withStyles(styles)(MainLayout);
