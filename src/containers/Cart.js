import React, { useState } from "react";
import CartItem from "./CartItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Sandbox from "./Sandbox";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function Cart(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(props.adder);
  // console.log(props);
  return (
    <div>
      <h2>My Cart</h2>
      {props.cartItems.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Venue Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Distance</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Diet Type</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.cartItems.map((item, key) => {
                  return (
                    <CartItem
                      key={key}
                      addToCart={props.addToCart}
                      item={item}
                      updateCartItem={props.updateCartItem}
                      deleteCartItem={props.deleteCartItem}
                      adder={props.adder}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 className="text-center"> Cart Total: ${props.adder}</h3>
        </div>
      ) : (
        <p>Cart is Currently Empty</p>
      )}
      <Button onClick={handleOpen} variant="contained">
        Check Out
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        adder={props.adder}
      >
        <div style={modalStyle} className={classes.paper}>
          <Sandbox appProps={props} />
          {/* <SimpleModal /> */}
        </div>
      </Modal>
    </div>
  );
}
