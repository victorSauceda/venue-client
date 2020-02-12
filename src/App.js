import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Home from "./containers/Home";
import Setting from "./containers/Setting";
import Cart from "./containers/Cart";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

const NotFound = () => {
  return <div>NotFound</div>;
};

const DashboardRoute = ({ component: Component, appProps, ...rest }) => {
  console.log(Component);
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} {...appProps} />
        </MainLayout>
      )}
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.updateCartItem = this.updateCartItem.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }
  addToCart(foodobj, qty) {
    this.setState(prevState => {
      const cartItems = [...prevState.cartItems];
      foodobj.qty = qty;
      cartItems.push(foodobj);
      console.log(cartItems);
      return { cartItems: cartItems };
    });
  }
  updateCartItem(foodobj, qty) {
    this.setState(prevState => {
      const cartItems = [...prevState.cartItems];
      const itemUpdating = cartItems.find(
        element => foodobj.name === element.name
      );
      itemUpdating.qty = qty;
      return { cartItems: cartItems };
    });
  }
  deleteCartItem(foodobj) {
    this.setState(prevState => {
      const cartItems = [...prevState.cartItems];
      let newCart = cartItems.filter(item => item.name !== foodobj.name);
      return { cartItems: newCart };
    });
  }
  render() {
    const { settings } = this.props;

    const childProps = {
      cartItems: this.state.cartItems,
      addToCart: this.addToCart,
      updateCartItem: this.updateCartItem,
      deleteCartItem: this.deleteCartItem
    };

    return (
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        {/* <div style={{ height: "100vh" }}> */}
        <Router>
          <Switch>
            <DashboardRoute path="/dashboard" component={Home} />
            <DashboardRoute
              path="/setting"
              component={Setting}
              appProps={childProps}
            />
            <DashboardRoute
              exact
              path="/"
              component={Home}
              appProps={childProps}
            />
            <DashboardRoute
              path="/cart"
              appProps={childProps}
              component={Cart}
            />
            <EmptyRoute component={NotFound} />
          </Switch>
        </Router>
        {/* </div> */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

export default connect(mapStateToProps, null)(App);
