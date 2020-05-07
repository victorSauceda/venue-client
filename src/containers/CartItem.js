import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";

class CartItem extends React.Component {
  handleChangeAdd = (item, qty) => {
    this.props.updateCartItem(item, qty);
  };

  handleChangeMinus = (item, qty) => {
    // Add in separate picee of logic, so if that if it goes to 0 - run remove item function
    this.props.updateCartItem(item, qty);
  };
  render() {
    const { item } = this.props;

    let lessThan = this.props.item.qty - 1;
    let moreThan = this.props.item.qty + 1;
    return (
      <TableRow key={item.name}>
        <TableCell align="left">
          <img
            src={`https://venueappimages.s3.us-west-2.amazonaws.com/private/us-west-2%3A47c95c2c-3e37-4645-a66c-c4b49a51347c/${item.imgSrc}`}
            alt={item.alt}
            style={{
              height: "10rem",
              width: "12rem",
              display: "block",
            }}
            height="42"
            width="442"
          />
          <p style={{ textAlign: "justify", width: "12rem" }}>{item.name}</p>
        </TableCell>
        <TableCell align="right">
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <RemoveIcon
              onClick={() => {
                this.handleChangeMinus(item, lessThan);
              }}
              style={{ marginTop: "4px" }}
            />
            <p
              style={{
                marginLeft: "-23px",
                marginRight: "-22px",
                marginTop: "4px",
              }}
            >
              {item.qty}
            </p>

            <AddCircleOutlineIcon
              onClick={() => this.handleChangeAdd(item, moreThan)}
              style={{ marginLeft: "-34px !important", marginTop: "4px" }}
            ></AddCircleOutlineIcon>
          </div>
        </TableCell>
        <TableCell align="right">{item.dietType}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => this.props.deleteCartItem(item)}
          >
            Remove From List
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
export default CartItem;
