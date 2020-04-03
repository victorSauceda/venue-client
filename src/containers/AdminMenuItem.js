import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";
import { API } from "aws-amplify";

// import sanityClient from "./client";
// import imageUrlBuilder from "@sanity/image-url";
// import myConfigSanityClient from "./client";
// const builder = imageUrlBuilder(myConfigSanityClient);

function AdminMenuItem(props) {
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
          <Button
            variant="contained"
            style={{ backgroundColor: "#eaebf1" }}
            onClick={() => props.deleteMenuItem(item._id)}
          >
            Remove Item From Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default AdminMenuItem;
