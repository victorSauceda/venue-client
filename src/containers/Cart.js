import React from "react";
import CartItem from "./CartItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export default function Cart(props) {
  console.log(props.cartItems);
  let adder = props.cartItems.reduce((acc, next) => {
    return acc + next.price * next.qty;
  }, 0);
  console.log("trying to add:", adder);
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
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 className="text-center"> Cart Total: ${adder}</h3>
        </div>
      ) : (
        <p>Cart is Currently Empty</p>
      )}
    </div>
  );
}
