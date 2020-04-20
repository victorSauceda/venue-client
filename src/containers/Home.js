import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItemComp from "./MenuItem";
import Search from "./Search";
import { API } from "aws-amplify";
import AdminOrders from "./AdminOrders";
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableRow,
  Grid,
  Button,
  Modal,
} from "@material-ui/core";

const classes = {
  card: {
    height: "100%",
    display: "auto",
    flexDirection: "row",
    marginBottom: "20px !important",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  textAlignMe: {
    textAlign: "center",
  },
};
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: "50%",
    left: "50%",
    transform: `translate(10%, 10%)`,
    maxWidth: "80%",
  };
};
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    // console.log("HOME PROPS");
    // console.log(props);

    this.state = {
      keto: true,
      paleo: true,
      open: false,
      menu: [],
    };
  }

  // async componentDidMount() {
  //   try {
  //     const responseMenu = await API.get("vic", "/menuitems");
  //     // console.log("response", responseMenu);
  //     this.setState({ menu: responseMenu });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  handleKetoActive = () => {
    this.setState({ keto: !this.state.keto });
  };

  handlePaleoActive = () => {
    this.setState({ paleo: !this.state.paleo });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    console.log("homeProps:", this.props.appProps.transactions);
    // console.log("menu:", this.state.menu);
    return (
      <div

      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   flexDirection: "column"
      // }}
      >
        <span style={{ display: "flex" }}>
          <Search
            ketoActive={this.state.keto}
            paleoActive={this.state.paleo}
            handleKeto={this.handleKetoActive}
            handlePaleo={this.handlePaleoActive}
          />{" "}
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#eaebf1", display: "flex" }}
            onClick={() => this.setState({ open: true })}
          >
            View Orders
          </Button>
        </span>
        <Grid
          className={classes.paper}
          container
          direction="row"
          spacing={3}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            overflow: "auto",
          }}
        >
          {this.props.appProps.menuItems.map((item, key) => {
            return (
              <>
                {item.dietType === "keto" && this.state.keto === true ? (
                  <Grid
                    key={key}
                    item
                    xs={12}
                    sm={6}
                    style={{
                      display: "flex",
                      alignItems: "space-evenly",
                      overflow: "auto",
                      marginTop: "2rem",
                    }}
                  >
                    <MenuItemComp
                      item={item}
                      key={key}
                      addToCart={this.props.appProps.addToCart}
                      classes={classes}
                      appProps={this.props}
                    />
                  </Grid>
                ) : null}
                {item.dietType === "paleo" && this.state.paleo === true ? (
                  <Grid
                    key={key}
                    item
                    xs={12}
                    sm={6}
                    style={{
                      display: "flex",
                      alignItems: "space-evenly",
                      overflow: "auto",
                      marginTop: "2rem",
                    }}
                  >
                    <MenuItemComp
                      item={item}
                      key={key}
                      addToCart={this.props.appProps.addToCart}
                      classes={classes}
                      appProps={this.props}
                    />
                  </Grid>
                ) : null}
              </>
            );
          })}
        </Grid>
        <ShoppingCartIcon />
        {this.state.isClicked ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>

                  <TableCell align="right">Order_Id</TableCell>
                  <TableCell align="right">Items Ordered</TableCell>

                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.appProps.transactions.map((transaction, idx) => {
                  return transaction.customerName == "victor sauceda" ? (
                    <AdminOrders transaction={transaction} />
                  ) : null;
                })}
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          adder={this.props.appProps.adder}
        >
          <div
            style={getModalStyle()}
            // style={{
            //   top: 50 + (Math.round(Math.random() * 20) - 10) + "%",
            //   left: 50 + (Math.round(Math.random() * 20) - 10) + "%",
            //   transform: `translate(-${50 +
            //     (Math.round(Math.random() * 20) - 10)}%, -${left}%)`
            // }}
            className={classes.paper}
          >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>

                    <TableCell align="right">Order_Id</TableCell>
                    <TableCell align="right">Items Ordered</TableCell>

                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.appProps.transactions.map((transaction, idx) => {
                    return transaction.customerName == "victor sauceda" ? (
                      <AdminOrders transaction={transaction} />
                    ) : null;
                  })}
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <StripeContainer appProps={this.props} /> */}
            {/* <SimpleModal /> */}
          </div>
        </Modal>
      </div>
    );
  }
}

// <ShoppingCartIcon
//                   style={{
//                     position: "fixed",
//                     bottom: "560px",
//                     right: "1000px"
//                   }}
//                 />

// const mapStateToProps = state => {
//   return {
//     stepCounter: state.stepCounter
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       increment: () => increment(),
//       decrement: () => decrement()
//     },
//     dispatch
//   );
// };

export default Home;
