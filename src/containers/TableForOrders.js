import React from "react";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

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
function TableForOrders(props) {
  const { item } = props;
  // console.log("cartItems:", item);

  return (
    <>
      <TableRow key={item.customerName}>
        <TableCell component="th" scope="row">
          {item.orderId}
        </TableCell>

        <TableCell align="right">{item.dietType}</TableCell>
        <TableCell align="right">{item.qty}</TableCell>
        <TableCell align="right">{item.total}</TableCell>
      </TableRow>
    </>
  );
}
export default TableForOrders;
