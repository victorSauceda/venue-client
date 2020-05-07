import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItemComp from "./MenuItem";
import Search from "./Search";
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
// const getModalStyle = () => {
//   return {
//     top: "50%",
//     left: "50%",
//     transform: `translate(10%, 10%)`,
//     maxWidth: "80%",
//   };
// };

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keto: true,
      paleo: true,
      open: false,
      menu: [],
    };
  }

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
    return (
      <div>
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
                    sm={3}
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
                    sm={3}
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
                  return transaction.customerName === "victor sauceda" ? (
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
            style={{
              backgroundColor: "white",
              margin: "0 auto",
              width: "80%",
              height: "auto",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "3rem",
              borderColor: "white !important",
            }}
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

                    <TableCell align="center">Order_Id</TableCell>
                    <TableCell align="center">Items Ordered</TableCell>

                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.appProps.transactions.map((transaction, idx) => {
                    let totalPrice = transaction.cartItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.price * currentValue.qty,

                      0
                    );

                    console.log("totalPriceNew", totalPrice);

                    return transaction.customerName === "victor sauceda" ? (
                      <AdminOrders
                        transaction={transaction}
                        totalPrice={totalPrice}
                      />
                    ) : null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Modal>
      </div>
    );
  }
}

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
