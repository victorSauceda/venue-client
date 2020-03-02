import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";

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
    marginBottom: "20px !important"
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
class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChangeAdd = (item, qty) => {
    console.log("handleChange add: ", item);
    console.log("item qty", qty);

    this.props.updateCartItem(item, qty);
  };

  handleChangeMinus = (item, qty) => {
    console.log("handleChange minus: ", item);
    console.log("item qty", qty);
    // Add in separate picee of logic, so if that if it goes to 0 - run remove item function
    this.props.updateCartItem(item, qty);
  };
  render() {
    const { item } = this.props;
    console.log("Cart Item: ", item);
    console.log(this.props);
    let lessThan = this.props.item.qty - 1;
    let moreThan = this.props.item.qty + 1;
    return (
      <TableRow key={item.name}>
        <TableCell component="th" scope="row">
          <img
            src={item.img}
            alt={item.alt}
            style={{
              height: "10rem",
              width: "12rem",
              display: "block",
              margin: "0 auto"
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
              display: "flex"
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
                marginTop: "4px"
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
        <TableCell align="right">{item.distance}</TableCell>
        <TableCell align="right">{item.calories}</TableCell>
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
