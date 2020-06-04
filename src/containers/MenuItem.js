import React, { useState } from "react";

import { useFormFields } from "../libs/hooksLib";
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  Modal,
  Typography,
  SwipeableDrawer,
  Table,
  TableRow,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  CardContent,
  Button,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import "./MenuItem.css";
import CartItem from "./CartItem";
import StripeContainer from "./StripeContainer";

function MenuItemComp(props) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  // const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    orderDescription: "",
  });
  const handleChangeAdd = async (event) => {
    console.log("bef", quantity);
    setQuantity(quantity + 1);
    console.log("af", quantity);
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
    setCartClick(true);
  };

  const { item, classes } = props;
  console.log("propsThatNeed: ", props);
  console.log("cart", props.appProps.appProps.cartItems.length);
  return (
    <>
      <Card style={{ marginBottom: "20px", width: "30rem" }}>
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

              minHeight: "20rem",
              height: "15rem",
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
        adder={props.appProps.appProps.adder}
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
      <SwipeableDrawer
        style={{}}
        anchor="right"
        open={cartClick}
        onClose={() => setCartClick(false)}
        onOpen={() => setCartClick(true)}
        role="presentation"
      >
        <div
          style={{ maxWidth: "fit-content", margin: "0 auto", padding: "2rem" }}
        >
          <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>My Cart</h2>
          {props.appProps.appProps.cartItems.length > 0 ? (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Venue Item</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Diet Type</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {console.log("show me these", props.appProps)}
                    {props.appProps.appProps.cartItems.map((item, key) => {
                      {
                        console.log("props inside", props.appProps.appProps);
                      }
                      return (
                        <CartItem
                          key={key}
                          addToCart={props.appProps.appProps.addToCart}
                          item={item}
                          updateCartItem={
                            props.appProps.appProps.updateCartItem
                          }
                          deleteCartItem={
                            props.appProps.appProps.deleteCartItem
                          }
                          adder={props.appProps.appProps.adder}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <h3
                className="text-center"
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              >
                {" "}
                Cart Total: ${props.appProps.appProps.adder}
              </h3>
            </div>
          ) : (
            <p>Cart is Currently Empty</p>
          )}
          <Button onClick={() => setOpen(true)} variant="contained" fullWidth>
            Check Out
          </Button>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            onClose={() => setOpen(true)}
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
              className={classes.paper}
            >
              <StripeContainer
                appProps={props}
                onClose={() => setOpen(false)}
              />
            </div>
          </Modal>
        </div>
      </SwipeableDrawer>
    </>
  );
}
export default MenuItemComp;
