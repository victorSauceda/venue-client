import React, { useEffect, useState } from "react";
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
// import items from "../ghettoDB";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";

import CardMedia from "@material-ui/core/CardMedia";
// import sanityClient from "./client";
// import imageUrlBuilder from "@sanity/image-url";
// import myConfigSanityClient from "./client";
// const builder = imageUrlBuilder(myConfigSanityClient);

function MenuItemComp(props) {
  const [quantity, setQuantity] = useState(1);
  const handleChangeAdd = async event => {
    setQuantity(quantity + 1);
  };

  const handleChangeMinus = async event => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // useEffect(() => {
  //   onLoad();
  // }, []);
  // async function onLoad() {
  //   try {
  //     const menuitem = await sanityClient.fetch(`
  //       *[_type == 'menuitems']{
  //         name, slug, image, description, diettype, price}`);
  //     console.log("testing: ", menuitem);
  //     this.setState = { menuItem: menuitem };
  //   } catch (e) {
  //     if (e !== "No current user") {
  //       alert(e);
  //     }
  //   }
  //   // setIsLoading(false);
  // }

  const { item, classes } = props;
  console.log("props to see if appprops: ", props);
  return (
    <Card style={{ marginBottom: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h3
          style={{
            marginBottom: "15px",
            marginTop: "10px"
          }}
        >
          <em>{item.name}</em>
        </h3>

        <img
          src={item.img}
          alt={item.alt}
          style={{
            textAlign: "center"
          }}
          width="80%"
        />
      </div>
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
        {/* <Typography>
          Calories:<strong>{item.calories}</strong>
        </Typography> */}
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
            onClick={handleChangeMinus}
            style={{ marginTop: "7px" }}
          />
          <p
            style={{
              marginLeft: "-23px",
              marginRight: "-22px",
              marginTop: "7px"
            }}
          >
            {quantity}
          </p>

          <AddCircleOutlineIcon
            onClick={handleChangeAdd}
            style={{ marginLeft: "-34px !important", marginTop: "7px" }}
          ></AddCircleOutlineIcon>

          <Button
            variant="contained"
            style={{ backgroundColor: "#eaebf1" }}
            onClick={() => props.addToCart(item, quantity)}
          >
            Add {quantity} to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default MenuItemComp;
