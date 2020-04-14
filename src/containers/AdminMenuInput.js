import React, { createContext } from "react";

import { API } from "aws-amplify";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { uuid } from "uuidv4";
import { s3Upload } from "../libs/awsLibs";
import config from "../config";
import AWS from "aws-sdk";
const file = React.createRef();

export default class AdminMenuInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      imgSrc: "",
      alt: "",
      price: "",
      inStock: "",
      dietType: "",
      content: "",
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.s3Function = this.s3Function.bind(this);
  }
  s3Function(file, filenameParameter) {
    const s3 = new AWS.S3({
      region: "us-west-2",
      params: {
        Bucket: "venueappimages"
      }
    });
    let filename = filenameParameter;
    return s3
      .upload({
        Key: filename,
        Body: file,
        ContentType: file.type,
        ACL: "public-write",
        CacheControl: "no-cache"
      })
      .promise();
  }

  //   validateForm() {
  //     return this.state.content.length > 0;
  //   }

  handleFileChange(event) {
    file.current = event.target.files[0];
  }
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  handleChange = async event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    let body = {
      name: this.state.name,
      description: this.state.description,
      img: file.current,
      alt: this.state.alt,
      price: this.state.price,
      dietType: this.state.dietType,
      inStock: this.state.inStock
    };

    console.log(body);

    try {
      await API.post("vic", "/admin/menuitems", { body });
      console.log("body: ", body);
      console.log("file: ", file);
      const attachment = file.current
        ? await s3Upload(file.current, "something.jpg")
        : null;
      console.log("attachment: ", attachment);
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
    }

    // try {
    //   //   await API.post("vic", "/admin/menuitems", { body });
    //   console.log("file: ", file);
    //   const attachment = file.current
    //     ? await this.s3Function(file.current, "something.jpg")
    //     : null;
    //   console.log("attachment: ", attachment);
    // } catch (e) {
    //   console.log(e);
    // }

    //     try {
    //       const responseSave = await API.post("vic", "/save", {
    //         image_url: this.state.imgSrc,
    //         key: this.state.imgSrc
    //       });
    //       console.log(" save response", responseSave);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };
  };
  render() {
    const style = {
      marginTop: "45px"
    };
    return (
      <>
        <form
          //   className="feedback-form"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white"
          }}
          onSubmit={this.handleSubmit}
        >
          <h1 className="text-center">Add items to the Menu</h1>

          <FormControl controlId="exampleForm.ControlInput1">
            <InputLabel>Name</InputLabel>
            <Input
              type="text"
              placeholder="name@example.com"
              name="name"
              onChange={this.handleChange}
              //   required
              value={this.state.name}
            />
          </FormControl>
          <FormControl controlId="exampleForm.ControlInput1">
            <InputLabel>Description</InputLabel>
            <Input
              type="text"
              placeholder="please add a description of the item"
              name="description"
              onChange={this.handleChange}
              //   required
              value={this.state.description}
            />
          </FormControl>
          <FormControl controlId="exampleForm.ControlInput1">
            <InputLabel>Diet Type</InputLabel>
            <Input
              type="text"
              placeholder="How many items are in stock"
              name="dietType"
              onChange={this.handleChange}
              //   required
              value={this.state.dietType}
            />
          </FormControl>
          <FormControl controlId="file">
            <InputLabel>Attachment</InputLabel>
            <Input
              type="file"
              placeholder="please attach an image"
              name="imgSrc"
              onChange={this.handleFileChange}
              //   required
              // value={this.state.imgSrc}
            />
          </FormControl>

          <FormControl controlId="exampleForm.ControlInput1">
            <InputLabel>Alternate Text</InputLabel>
            <Input
              type="text"
              placeholder="alternate text to display in for screen readers"
              name="alt"
              onChange={this.handleChange}
              //   required
              value={this.state.alt}
            />
          </FormControl>
          <FormControl controlId="exampleForm.ControlInput1">
            <InputLabel>Price</InputLabel>
            <Input
              type="text"
              placeholder="How much are you going to sell this product for"
              name="price"
              onChange={this.handleChange}
              //   required
              value={this.state.price}
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
  }
}
