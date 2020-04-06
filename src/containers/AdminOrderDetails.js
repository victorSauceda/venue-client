import React, { useEffect, useState } from "react";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
// import TableForOrders from "./TableForOrders";

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

function AdminOrderDetails(props) {
  console.log("admin order props: ", props);
  const [user, setUser] = useState({
    // name: ""
  });

  useEffect(() => {
    const rememberMe = localStorage.getItem("travic");
    console.log("remember me", rememberMe);
    setUser(rememberMe[0]);
  }, []);
  console.log("we are looking at the user", user);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>

              <TableCell align="right">Order_Id</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Diet Type</TableCell>
              <TableCell align="right">Qty</TableCell>

              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={user.customerName}>
              <TableCell component="th" scope="row">
                {user.venueName}
              </TableCell>
              <TableCell align="right">{user.customerName}</TableCell>
              <TableCell align="right">{user.orderId}</TableCell>
              <TableCell align="right">{user.dietType}</TableCell>
              <TableCell align="right">{user.qty}</TableCell>
              <TableCell align="right">{user.price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {user.name}
    </div>
  );
}
export default AdminOrderDetails;