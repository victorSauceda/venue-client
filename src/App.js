import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Home from "./containers/Home";
import Theme from "./containers/Theme";
import Cart from "./containers/Cart";
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import Login from "./containers/Login";
import Sandbox from "./containers/Sandbox";
import Admin from "./containers/Admin";
import AdminOrderDetails from "./containers/AdminOrderDetails";

import StripeContainer from "./containers/StripeContainer";
import updateMenuItem from "./containers/updateMenuItem";
import { API } from "aws-amplify";
import AdminUpdateForm from "./containers/AdminUpdateForm";
import { userParams } from "react-router";

const NotFound = () => {
  return <div>NotFound</div>;
};
const RouteObject = ({ childProps }) => {
  console.log("childprops in route", childProps);
  return (
    <Router>
      <Switch>
        <DashboardRoute path="/dashboard" component={Home} />
        <DashboardRoute path="/theme" component={Theme} appProps={childProps} />
        <DashboardRoute exact path="/" component={Home} appProps={childProps} />
        <DashboardRoute
          exact
          path="/admin"
          component={Admin}
          appProps={childProps}
        />
        <DashboardRoute
          path={`/admin/menuitems/:id/update`}
          appProps={childProps}
          component={AdminUpdateForm}
        />
        <DashboardRoute
          path={`/admin/transaction/:id`}
          appProps={childProps}
          component={AdminOrderDetails}
        />
        <DashboardRoute
          path={`/admin/menuitems`}
          appProps={childProps}
          exact
          component={Admin}
        />

        <DashboardRoute
          path={`/admin/menuitems/:id`}
          appProps={childProps}
          component={updateMenuItem}
        />

        <DashboardRoute
          path="/login"
          exact
          component={Login}
          appProps={childProps}
        />
        <DashboardRoute
          path="/sandbox"
          exact
          component={StripeContainer}
          appProps={childProps}
        />
        <DashboardRoute
          path="/stripeContainer"
          exact
          component={StripeContainer}
          appProps={childProps}
        />
        <DashboardRoute path="/cart" appProps={childProps} component={Cart} />
        <DashboardRoute
          path="/settings"
          appProps={childProps}
          component={Cart}
        />

        <EmptyRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

const DashboardRoute = ({
  component: Component,
  appProps: appProps,
  ...rest
}) => {
  // console.log(Component);
  // console.log("appProps", appProps);
  // console.log("rest", rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log("props f", props);
        return (
          <MainLayout appProps={appProps}>
            <Component appProps={appProps} {...props} {...rest} />
          </MainLayout>
        );
      }}
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
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
      cartItems: [],
      transactions: [],
      menuItems: [],
    };
    this.addToCart = this.addToCart.bind(this);
    this.updateCartItem = this.updateCartItem.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  async componentDidMount() {
    const response = await API.get("vic", "/transaction");
    // console.log("Response from Mongo: ", response);
    this.setState({ transactions: response });
    this.getMenuItem();
  }
  async getMenuItem() {
    try {
      const responseMenu = await API.get("vic", "/admin/menuitems");

      // console.log("menu items api call", responseMenu);
      this.setState({ menuItems: responseMenu });
    } catch (e) {
      console.log("api call err for menu", e);
    }
  }

  addToCart(foodobj, qty, description) {
    this.setState((prevState) => {
      const cartItems = [...prevState.cartItems];
      foodobj.qty = qty;
      foodobj.orderDescription = description;
      cartItems.push(foodobj);
      // console.log(cartItems);
      return { cartItems: cartItems };
    });
  }
  updateCartItem(foodobj, qty) {
    // console.log("Food Object", foodobj);
    // console.log("update cart item qty: ", qty);
    this.setState((prevState) => {
      const cartItems = [...prevState.cartItems];
      const itemUpdating = cartItems.find(
        (element) => foodobj.name === element.name
      );
      itemUpdating.qty = qty;
      // console.log("Updated Cart Items: ", cartItems);
      return { cartItems: cartItems };
    });
  }
  deleteCartItem(foodobj) {
    this.setState((prevState) => {
      const cartItems = [...prevState.cartItems];
      let newCart = cartItems.filter((item) => item.name !== foodobj.name);
      return { cartItems: newCart };
    });
  }
  render() {
    const { settings } = this.props;
    let adder = this.state.cartItems.reduce((acc, next) => {
      return acc + next.price * next.qty;
    }, 0);
    // console.log("adder: ", adder);
    // console.log(this.props);
    const childProps = {
      cartItems: this.state.cartItems,
      addToCart: this.addToCart,
      updateCartItem: this.updateCartItem,
      deleteCartItem: this.deleteCartItem,
      adder: adder,
      menuItems: this.state.menuItems,
      transactions: this.state.transactions,
    };

    return (
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        {/* <div style={{ height: "100vh" }}> */}
        <RouteObject childProps={childProps} />
        {/* </div> */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStateToProps, null)(App);
