import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Home from "./containers/Home";
import Theme from "./containers/Theme";
import Cart from "./containers/Cart";
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import AdminOrderDetails from "./containers/AdminOrderDetails";
import StripeContainer from "./containers/StripeContainer";
import updateMenuItem from "./containers/updateMenuItem";
import { API } from "aws-amplify";
import AdminUpdateForm from "./containers/AdminUpdateForm";
import AdminViewMenuPage from "./containers/AdminViewMenuPage";
import OrderDetails from "./containers/OrderDetails";
import Signup from "./containers/Signup";
import { AppContext, useAppContext } from "./libs/contextLib";
// import ErrorBoundary from "./components/ErrorBoundary";
function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const NotFound = () => {
  return <div>NotFound</div>;
};
const RouteObject = ({ childProps }) => {
  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute path="/dashboard" component={Home} />
        <UnauthenticatedRoute
          path="/theme"
          component={Theme}
          appProps={childProps}
        />
        <UnauthenticatedRoute
          exact
          path="/"
          component={Home}
          appProps={childProps}
        />
        <AuthenticatedRoute
          path={`/myorders/:id`}
          appProps={childProps}
          component={OrderDetails}
        />
        <AuthenticatedRoute
          exact
          path="/admin"
          component={Admin}
          appProps={childProps}
        />
        <AuthenticatedRoute
          path={`/admin/menuitems/:id/update`}
          appProps={childProps}
          component={AdminUpdateForm}
        />
        <AuthenticatedRoute
          path={`/admin/transaction/:id`}
          appProps={childProps}
          component={AdminOrderDetails}
        />
        <AuthenticatedRoute
          path={`/admin/menuitems`}
          appProps={childProps}
          exact
          component={Admin}
        />
        <AuthenticatedRoute
          path={`/admin/menuitems/view`}
          appProps={childProps}
          component={AdminViewMenuPage}
        />
        <AuthenticatedRoute
          path={`/admin/menuitems/:id`}
          appProps={childProps}
          component={updateMenuItem}
        />

        <UnauthenticatedRoute
          path="/login"
          exact
          component={Login}
          appProps={childProps}
        />
        <UnauthenticatedRoute
          path="/signup"
          exact
          component={Signup}
          appProps={childProps}
        />
        <AuthenticatedRoute
          path="/sandbox"
          exact
          component={StripeContainer}
          appProps={childProps}
        />
        <AuthenticatedRoute
          path="/stripeContainer"
          exact
          component={StripeContainer}
          appProps={childProps}
        />
        <AuthenticatedRoute
          path="/cart"
          appProps={childProps}
          component={Cart}
        />
        <AuthenticatedRoute
          path="/settings"
          appProps={childProps}
          component={Cart}
        />

        <EmptyRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

const AuthenticatedRoute = ({
  props,
  component: Component,
  appProps,
  ...rest
}) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        <MainLayout appProps={appProps}>
          <Component appProps={appProps} {...props} {...rest} />
        </MainLayout>
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
      }
    </Route>
  );
};
const UnauthenticatedRoute = ({
  props,
  component: Component,
  appProps,
  ...rest
}) => {
  const { isAuthenticated } = useAppContext();
  console.log("isAuthenticated: ", isAuthenticated);
  const redirect = querystring("redirect");

  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        <MainLayout appProps={appProps}>
          <Component appProps={appProps} {...props} {...rest} />
        </MainLayout>
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
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

function App(props) {
  const [cartItems, setCartItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const response = await API.get("vic", "/transaction");
      setTransactions(response);
      const responseMenu = await API.get("vic", "/admin/menuitems");
      setMenuItems(responseMenu);
    } catch (e) {
      console.log(e);
    }
  }

  const addToCart = (foodobj, qty, description) => {
    let newCart = cartItems.slice();
    foodobj.qty = qty;
    foodobj.orderDescription = description;
    newCart.push(foodobj);
    return setCartItems(newCart);

    // this.setState((prevState) => {
    //   const cartItems = [...prevState.cartItems];
    //   foodobj.qty = qty;
    //   foodobj.orderDescription = description;
    //   cartItems.push(foodobj);
    //   return { cartItems: cartItems };
  };
  const updateCartItem = (foodobj, qty) => {
    let newCart2 = cartItems.slice();
    const itemUpdating = newCart2.find(
      (element) => foodobj.name === element.name
    );
    itemUpdating.qty = qty;
    return setCartItems(itemUpdating);

    // this.setState((prevState) => {
    //   const cartItems = [...prevState.cartItems];
    //   const itemUpdating = cartItems.find(
    //     (element) => foodobj.name === element.name
    //   );
    //   itemUpdating.qty = qty;
    //   return { cartItems: cartItems };
    // });
  };
  const deleteCartItem = (foodobj) => {
    let newCart3 = cartItems.slice();
    const newCartAfterDelete = newCart3.filter(
      (item) => item.name !== foodobj.name
    );
    return setCartItems(newCartAfterDelete);

    // this.setState((prevState) => {
    //   const cartItems = [...prevState.cartItems];
    //   let newCart = cartItems.filter((item) => item.name !== foodobj.name);
    //   return { cartItems: newCart };
    // });
  };

  const { settings } = props;
  let adder = cartItems.reduce((acc, next) => {
    return acc + next.price * next.qty;
  }, 0);
  const childProps = {
    cartItems: cartItems,
    addToCart: addToCart,
    updateCartItem: updateCartItem,
    deleteCartItem: deleteCartItem,
    adder: adder,
    menuItems: menuItems,
    transactions: transactions,
  };

  return (
    <AppContext.Provider value={{ isAuthenticated: false }}>
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        {/* <div style={{ height: "100vh" }}> */}
        <RouteObject childProps={childProps} />
        {/* </div> */}
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStateToProps, null)(App);
