import React, { useState } from "react";

import { useFormFields } from "../libs/hooksLib";
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  Modal,
  Typography,
  CardContent,
  Button,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";

function MenuItemComp(props) {
  const [quantity, setQuantity] = useState(1);
  // const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    orderDescription: "",
  });
  const handleChangeAdd = async (event) => {
    setQuantity(quantity + 1);
  };

  const handleChangeMinus = async (event) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.addToCart(item, quantity, fields.orderDescription);
    setIsClicked(false);
  };

  const { item, classes } = props;
  return (
    <>
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              marginBottom: "15px",
              marginTop: "10px",
            }}
          >
            <em>{item.name}</em>
          </h3>

          <img
            src={`https://venueappimages.s3.us-west-2.amazonaws.com/private/us-west-2%3A47c95c2c-3e37-4645-a66c-c4b49a51347c/${item.imgSrc}`}
            alt={item.alt}
            style={{
              textAlign: "center",
              width: "25rem",
              height: "auto",
              minHeight: "20rem",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            marginTop: "20px",
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
              marginTop: "30px",
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
                marginTop: "7px",
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
          style={{
            backgroundColor: "white",
            margin: "0 auto",
            width: "80%",
            height: "auto",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "3rem",
            borderColor: "white !important",
          }}
        >
          <form
            //   className="feedback-form"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fafafa",
              padding: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <h2>Customize Your Order</h2>
            <FormControl controlId="orderDescription">
              <InputLabel>Enter Changes</InputLabel>
              <Input
                type="text"
                placeholder="Customize Order"
                onChange={handleFieldChange}
                id="orderDescription"
                // required
              />
            </FormControl>
            <Button
              style={{ marginTop: "1rem" }}
              type="submit"
              variant="contained"
              color="primary"
              block
            >
              Continue
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default MenuItemComp;
