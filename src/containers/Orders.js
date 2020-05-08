import React from "react";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function Orders(props) {
  const { transaction } = props;

  return (
    <>
      <TableRow key={transaction.customerName}>
        <TableCell component="th" scope="row">
          {transaction.customerName}
        </TableCell>

        <TableCell align="center">{transaction.orderId}</TableCell>
        <TableCell align="center">
          <Button>
            {" "}
            <Link
              to={{
                pathname: `/myorders/${transaction.orderId}`,
                state: { transaction: transaction },
              }}
            >
              View Details
            </Link>
          </Button>
        </TableCell>
        <TableCell align="right">{props.totalPrice}</TableCell>
      </TableRow>
    </>
  );
}
export default Orders;
