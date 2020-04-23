import React from "react";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import AdminOrderDetails from "./AdminOrderDetails";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
// import items from "../data/transactions";

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
    width: "35% !important ",
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
};
function AdminOrders(props) {
  const { transaction } = props;
  console.log("2transaction: ", transaction);

  return (
    <>
      <TableRow key={transaction.customerName}>
        <TableCell component="th" scope="row">
          {transaction.customerName}
        </TableCell>

        <TableCell align="right">{transaction.orderId}</TableCell>
        <TableCell align="right">
          <Button>
            {" "}
            <Link
              to={{
                pathname: `admin/transaction/${transaction.orderId}`,
                state: { transaction: transaction },
              }}
            >
              View Details
            </Link>
          </Button>
        </TableCell>
        <TableCell align="right">{transaction.total}</TableCell>
      </TableRow>
    </>
  );
}
export default AdminOrders;
