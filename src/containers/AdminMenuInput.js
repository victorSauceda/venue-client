import { API } from "aws-amplify";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";

import { s3Upload } from "../libs/awsLibs";
import config from "../config";
import React, { useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const AdminMenuInput = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alt, setAlt] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [dietType, setDietType] = useState("");
  const file = React.useRef(null);

  // const validateForm = () => {
  //   content.length > 0;
  // };
  // useEffect(() => {
  //   setNameState(props);
  // }, [props]);

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
  };

  // const handleChange = async (event) => {
  // this.setState({
  //   [event.target.name]: event.target.value,
  // });
  const handleChange = async (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "alt":
        setAlt(event.target.value);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      case "inStock":
        setInStock(event.target.value);
        break;
      case "dietType":
        setDietType(event.target.value);
        break;
      default:
        console.error("invalid value");
    }
  };
  // };
  // const validateForm = () => {
  //   return content.length > 0;
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    // this.setState({ isLoading: true });

    try {
      const attachment = file.current
        ? await s3Upload(file.current, "something.jpg")
        : null;
      let body = {
        name: name,
        description: description,
        imgSrc: attachment,
        alt: alt,
        price: price,
        dietType: dietType,
        inStock: inStock,
      };
      // body.img = attachement;
      await API.post("vic", "/admin/menuitems", { body });
      props.onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "5rem",
        }}
        onSubmit={handleSubmit}
      >
        <h1
          className="text-center"
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Add items to the Menu
        </h1>

        <FormControl
          controlId="exampleForm.ControlInput1"
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel>Name</InputLabel>
          <Input
            type="text"
            placeholder="name@example.com"
            name="name"
            onChange={handleChange}
            //   required
            value={name}
          />
        </FormControl>
        <FormControl
          controlId="exampleForm.ControlInput1"
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel>Description</InputLabel>
          <Input
            type="text"
            placeholder="please add a description of the item"
            name="description"
            onChange={handleChange}
            //   required
            value={description}
          />
        </FormControl>
        <FormControl
          controlId="exampleForm.ControlInput1"
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel>Diet Type</InputLabel>
          <Input
            type="text"
            className="MuiInput-input"
            placeholder="How many items are in stock"
            name="dietType"
            onChange={handleChange}
            //   required
            value={dietType}
            variant="outlined"
          />
        </FormControl>

        <FormControl
          controlId="exampleForm.ControlInput1"
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel>Alternate Text</InputLabel>
          <Input
            type="text"
            placeholder="alternate text to display in for screen readers"
            name="alt"
            onChange={handleChange}
            //   required
            value={alt}
          />
        </FormControl>
        <FormControl
          controlId="exampleForm.ControlInput1"
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel>Price</InputLabel>
          <Input
            type="text"
            placeholder="How much are you going to sell this product for"
            name="price"
            onChange={handleChange}
            //   required
            value={price}
          />
        </FormControl>
        <FormControl controlId="file" style={{ marginBottom: "1rem" }}>
          {/* <InputLabel>Choose Attachment</InputLabel> */}
          <Input
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            id="input1"
            //   required
            // value={imgSrc}
          />
          <label htmlFor="input1">
            <IconButton
              style={{ backgroundColor: "transparent" }}
              color="primary"
              component="span"
            >
              <PhotoCamera />
              <p style={{ marginLeft: "2rem" }}>Choose Image</p>
            </IconButton>
          </label>
        </FormControl>
        <Button
          type="text"
          block
          variant="outlined"
          style={{ marginBottom: "1rem", backgroundColor: "#f44336" }}
        >
          Delete Item
        </Button>

        <Button
          type="submit"
          variant="outlined"
          block
          style={{ marginBottom: "1rem", backgroundColor: "#00e676" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AdminMenuInput;
