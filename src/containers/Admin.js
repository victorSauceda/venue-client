import React from "react";

import { VictoryPie } from "victory";
import transactions from "../data/transactions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminOrders from "./AdminOrders";
import { API } from "aws-amplify";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import items from "../data/transactions";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableForOrders from "./TableForOrders";
import AdminMenuInput from "./AdminMenuInput";
import Container from "@material-ui/core/Container";

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
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px !important",
    width: "35% !important "
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  textAlignMe: {
    textAlign: "center"
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6)
  }
};
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      cartItems: [],
      isClicked: false,
      isAddMenuClicked: false
    };
  }
  async componentDidMount() {
    const response = await API.get("vic", "/transaction");
    console.log("Response from Mongo: ", response);
    this.setState({ notes: response });
  }
  render() {
    console.log("this is a sanity check", this.props.cartItems);
    let filteredArray = [];
    transactions.forEach(item => {
      item.itemsOrdered.forEach(element => {
        filteredArray.push(element);
      });
    });

    let veganCount = 0;
    let ketoCount = 0;
    let paleoCount = 0;
    filteredArray.map(item => {
      if (item.dietType == "vegan") {
        veganCount++;
      }
      if (item.dietType == "keto") {
        ketoCount++;
      }
      if (item.dietType == "paleo") {
        paleoCount++;
      }
    });
    console.log("vegan count:", veganCount);
    console.log("keto count:", ketoCount);
    console.log("paleo count:", paleoCount);

    return (
      <div>
        <div style={{ float: "left", clear: "left", marginLeft: "-100px" }}>
          <VictoryPie
            height={190}
            data={[
              { x: "Keto", y: ketoCount },
              { x: "Paleo", y: paleoCount },
              { x: "Vegan", y: veganCount }
            ]}
          />
        </div>
        <div style={{ float: "right" }}>
          {" "}
          <Button
            variant="contained"
            style={{ backgroundColor: "#eaebf1", display: "flex" }}
            onClick={() => this.setState({ isClicked: true })}
          >
            View Orders
          </Button>
          <Button
            variant="contained"
            style={{
              marginTop: "5px",
              backgroundColor: "#eaebf1",
              display: "flex"
            }}
            onClick={() => this.setState({ isAddMenuClicked: true })}
          >
            Add Menu Items
          </Button>
          <Button
            variant="contained"
            style={{
              marginTop: "5px",
              backgroundColor: "#eaebf1",
              display: "flex"
            }}
          >
            <Link
              style={{
                color: "black",

                fontSize: "2.5rem"
              }}
              color="default"
              to="/admin/menuitems"
            >
              View Menu
            </Link>
          </Button>
          {this.state.isAddMenuClicked ? <AdminMenuInput /> : null}
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
                  {this.state.notes.map((note, idx) => {
                    return <AdminOrders note={note} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Admin;
