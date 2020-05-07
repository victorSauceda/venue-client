import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import config from "../config";
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";

const file = React.createRef();

const AdminUpdateForm = (props) => {
  const [menuItem, setMenuItem] = useState({});
  let { id } = useParams();
  useEffect(() => {
    let aborted = false;
    let filterArr = props.appProps.menuItems.filter(
      (currId) => currId._id === id
    );
    setMenuItem(...filterArr);

    return () => (aborted = true);
  }, [id]);

  const handleChange = async (event) => {
    setMenuItem({ ...menuItem, [event.target.name]: event.target.value });
  };

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

    let body = {
      name: menuItem.name,
      description: menuItem.description,
      img: menuItem.imgSrc,
      alt: menuItem.alt,
      price: menuItem.price,
      dietType: menuItem.dietType,
      inStock: menuItem.inStock,
    };

    try {
      await API.post("vic", "/admin/menuitems", { body });

      props.history.push("/admin/menuitems");
    } catch (e) {
      console.error(e);
      // setState({ isLoading: false });
    }
  };

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Add items to the Menu</h1>

        <FormControl controlId="exampleForm.ControlInput1">
          <InputLabel>Name</InputLabel>
          <Input
            type="text"
            placeholder="name@example.com"
            name="name"
            onChange={handleChange}
            //   required
            value={menuItem.name}
          />
        </FormControl>
        <FormControl controlId="exampleForm.ControlInput1">
          <InputLabel>Description</InputLabel>
          <Input
            type="text"
            placeholder="please add a description of the item"
            name="description"
            onChange={handleChange}
            //   required
            value={menuItem.description}
          />
        </FormControl>
        <FormControl controlId="exampleForm.ControlInput1">
          <InputLabel>Diet Type</InputLabel>
          <Input
            type="text"
            placeholder="How many items are in stock"
            name="dietType"
            onChange={handleChange}
            //   required
            value={menuItem.dietType}
          />
        </FormControl>
        <FormControl controlId="text">
          <InputLabel>Attachment</InputLabel>
          <Input
            type="text"
            placeholder="please attach an image"
            name="imgSrc"
            onChange={handleChange}
            //   required
            value={menuItem.img}
          />
        </FormControl>

        <FormControl controlId="exampleForm.ControlInput1">
          <InputLabel>Alternate Text</InputLabel>
          <Input
            type="text"
            placeholder="alternate text to display in for screen readers"
            name="alt"
            onChange={handleChange}
            //   required
            value={menuItem.alt}
          />
        </FormControl>
        <FormControl controlId="exampleForm.ControlInput1">
          <InputLabel>Price</InputLabel>
          <Input
            type="text"
            placeholder="How much are you going to sell this product for"
            name="price"
            onChange={handleChange}
            //   required
            value={menuItem.price}
          />
        </FormControl>
        <Button type="text" block>
          Delete Item
        </Button>

        <Button type="submit" block>
          Submit
        </Button>
      </form>
    </>
  );
};

export default withRouter(AdminUpdateForm);
