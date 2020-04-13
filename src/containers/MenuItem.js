import React, { useEffect, useState, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import Album from "Album";
import { increment, decrement } from "../store/reducers/stepCounter";
import { useFormFields } from "../libs/hooksLib";
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  Modal,
  Typography,
  CardContent,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";
import CardMedia from "@material-ui/core/CardMedia";
// import sanityClient from "./client";
// import imageUrlBuilder from "@sanity/image-url";
// import myConfigSanityClient from "./client";
// const builder = imageUrlBuilder(myConfigSanityClient);
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function MenuItemComp(props) {
  const [quantity, setQuantity] = useState(1);
  // const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const modalStyle = React.useMemo(getModalStyle, []);
  const [fields, handleFieldChange] = useFormFields({
    orderDescription: ""
  });
  const handleChangeAdd = async event => {
    setQuantity(quantity + 1);
  };

  const handleChangeMinus = async event => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    props.addToCart(item, quantity, fields.orderDescription);
    console.log("orderDescription: ", fields.orderDescription);
    console.log("quantity: ", quantity);
    console.log("item: ", item);
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
    <>
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
              textAlign: "center",
              width: "25rem",
              height: "auto",
              minHeight: "20rem",
              objectFit: "cover"
            }}
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
              onClick={() => setIsClicked(true)}
            >
              Add {quantity} to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isClicked}
        onClose={() => setIsClicked(false)}
        adder={props.appProps.adder}
      >
        <div
          style={{ top: "70%", left: "70%", transform: `translate(20%, 20%)` }}
        >
          <form
            //   className="feedback-form"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: "20px"
            }}
            onSubmit={handleSubmit}
          >
            <FormControl controlId="orderDescription">
              <InputLabel>Customize Order</InputLabel>
              <Input
                type="text"
                placeholder="Customize Order"
                value={fields.orderDescription}
                onChange={handleFieldChange}
                id="orderDescription"
                // required
              />
              {console.log("fields: ", fields)}
            </FormControl>
            <Button type="submit" block>
              Continue
            </Button>
          </form>
          {/* <SimpleModal /> */}
        </div>
      </Modal>
    </>
  );
}
export default MenuItemComp;
