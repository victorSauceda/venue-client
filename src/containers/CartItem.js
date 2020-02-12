import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    this.state = {
      quantity: props.item.qty
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => this.setState({ quantity: event.target.value });
  render() {
    const { item } = this.props;
    return (
      <TableRow key={item.name}>
        <TableCell component="th" scope="row">
          <img
            src={item.img}
            alt={item.alt}
            style={{ height: "10rem", width: "12rem" }}
            height="42"
            width="442"
          />
          {item.name}
        </TableCell>
        <TableCell align="right">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Qty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
            {/* <Button
            variant="contained"
            onClick={() =>
              this.props.updateCartItem(item, this.state.quantity)
            }
          >
            Change Qty
          </Button> */}
          </FormControl>
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => this.props.updateCartItem(item, this.state.quantity)}
          >
            change qty
          </Button>
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
