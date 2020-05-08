import React from "react";

import { VictoryPie } from "victory";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminOrders from "./AdminOrders";

import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableRow,
  Modal,
} from "@material-ui/core";
import AdminMenuInput from "./AdminMenuInput";
const classes = {
  icon: {
    // marginRight: theme.spacing(2)
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper
    // padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    // marginTop: theme.spacing(4)
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8)
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
  footer: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6)
  },
  card: {
    height: "100%",
    display: "auto",
    flexDirection: "row",
    marginBottom: "20px !important",
  },
};

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // transactions: this.props.appProps.transactions,
      cartItems: props.cartItems,
      isClicked: false,
      isAddMenuClicked: false,
      // menuItems: this.props.appProps.menuItems,
      keto: true,
      paleo: true,
      isMenuClicked: false,
      openViewOrders: false,
    };
  }

  render() {
    let filteredArray = [];
    this.props.appProps.menuItems.forEach((item, idx) => {
      filteredArray.push(item);
    });

    let veganCount = 0;
    let ketoCount = 0;
    let paleoCount = 0;
    filteredArray.forEach((item) => {
      if (item.dietType === "vegan") {
        veganCount++;
      }
      if (item.dietType === "keto") {
        ketoCount++;
      }
      if (item.dietType === "paleo") {
        paleoCount++;
      }
    });

    return (
      <div>
        <div style={{ float: "left", clear: "left", marginLeft: "-100px" }}>
          <VictoryPie
            height={190}
            data={[
              { x: "Keto", y: ketoCount },
              { x: "Paleo", y: paleoCount },
              { x: "Vegan", y: veganCount },
            ]}
          />
        </div>

        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#eaebf1", display: "flex" }}
          onClick={() => this.setState({ openViewOrders: true })}
        >
          View Orders
        </Button>
        <Button
          variant="contained"
          display="block"
          fullWidth
          style={{
            marginTop: "1rem",
            backgroundColor: "#eaebf1",
            display: "flex",
          }}
          onClick={() => this.setState({ isAddMenuClicked: true })}
        >
          Add Menu Items
        </Button>
        <Button
          variant="contained"
          display="block"
          fullWidth
          style={{
            marginTop: "1rem",
            backgroundColor: "#eaebf1",
            display: "flex",
          }}
        >
          <Link
            onClick={() => this.setState({ isMenuClicked: true })}
            color="default"
            to={{
              pathname: "/admin/menuitems/view",
              // state: { menu: this.state.menuItems },
            }}
          >
            View Menu
          </Link>
        </Button>

        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isMenuClicked}
          onClose={() => this.setState({ isMenuClicked: false })}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // adder={props.appProps.adder}
        > */}

        {/* </Modal> */}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isAddMenuClicked}
          onClose={() => this.setState({ isAddMenuClicked: false })}

          // adder={props.appProps.adder}
        >
          <div
            className={classes.paper}
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
          >
            <AdminMenuInput
              onClose={() => this.setState({ isAddMenuClicked: false })}
            />
            {/* <SimpleModal /> */}
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openViewOrders}
          onClose={() => this.setState({ openViewOrders: false })}
          // adder={props.appProps.adder}
        >
          <div
            className={classes.paper}
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
          >
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
              All Orders
            </h1>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>

                    <TableCell align="center">Order_Id</TableCell>
                    {/* <TableCell align="center">Items Ordered</TableCell> */}
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
                      // ('currentValue.price: ', currentValue.price);
                    );

                    return (
                      <AdminOrders
                        transaction={transaction}
                        totalPrice={totalPrice}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <SimpleModal /> */}
          </div>
        </Modal>
      </div>
    );
  }
}
export default Admin;
