import React from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import Album from "Album";
import { increment, decrement } from "../store/reducers/stepCounter";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import items from "../ghettoDB";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";

import CardMedia from "@material-ui/core/CardMedia";

class MenuItemComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChangeAdd = this.handleChangeAdd.bind(this);
  }

  handleChangeAdd = event => {
    this.setState({
      quantity: this.state.quantity + 1
    });
  };

  handleChangeMinus = event => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  };

  render() {
    const { item, classes } = this.props;
    return (
      <Card style={{ marginBottom: "20px" }} className={classes.card}>
        <h1
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontFamily: "Rock Salt",
            color: "blue",

            textAlign: "center"
          }}
        >
          {item.venueName}
        </h1>
        <h3
          style={{
            marginBottom: "15px",
            marginTop: "10px",
            textAlign: "center"
          }}
        >
          <em>{item.name}</em>

          {/* <img src={item.dietTypeIcon} height="20" width="20" /> */}
        </h3>
        <p
          style={{
            textAlign: "right",
            marginRight: "1rem",
            marginBottom: ".4rem"
          }}
        >
          {item.distance} miles{" "}
        </p>
        <img
          src={item.img}
          alt={item.alt}
          style={{ height: "16rem", width: "22rem" }}
          height="142"
          width="142"
        />
        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            marginTop: "20px"
          }}
        >
          <Typography>
            Price:<strong>${item.price}</strong>
          </Typography>
          <Typography>
            Calories:<strong>{item.calories}</strong>
          </Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <Typography
            style={{ textAlign: "center" }}
            gutterBottom
            variant="h5"
            component="h2"
          ></Typography>

          <Typography style={{ textAlign: "center", height: "10rem" }}>
            {item.description}
          </Typography>

          <span> </span>

          {/* <Typography>Ingredients:{item.ingredients}</Typography> */}
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
              marginTop: "30px"
            }}
          >
            <RemoveIcon
              onClick={this.handleChangeMinus}
              style={{ marginTop: "7px" }}
            />
            <p
              style={{
                marginLeft: "-23px",
                marginRight: "-22px",
                marginTop: "7px"
              }}
            >
              {this.state.quantity}
            </p>

            <AddCircleOutlineIcon
              onClick={this.handleChangeAdd}
              style={{ marginLeft: "-34px !important", marginTop: "7px" }}
            ></AddCircleOutlineIcon>

            <Button
              variant="contained"
              style={{ backgroundColor: "#eaebf1" }}
              onClick={() => this.props.addToCart(item, this.state.quantity)}
            >
              Add {this.state.quantity} to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
export default MenuItemComp;
