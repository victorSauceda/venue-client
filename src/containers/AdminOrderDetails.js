import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

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

function AdminOrderDetails(props) {
  console.log("admin order props: ", props.location.state.transaction);
  const [user, setUser] = useState({
    // name: ""
  });

  useEffect(() => {
    const rememberMe = localStorage.getItem("travic");

    setUser(rememberMe[0]);
  }, []);

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <TableContainer style={{ marginTop: "2rem" }} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Order Details</TableCell>
              <TableCell align="left">Qty</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* taking out transactions of props.appProps.transactions.cartItems */}
            {props.location.state.transaction.cartItems.map((item, key) => {
              return (
                <>
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      {item.orderDescription}
                    </TableCell>
                    <TableCell align="left">{item.qty}</TableCell>
                    <TableCell align="left">{item.price}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AdminOrderDetails;
