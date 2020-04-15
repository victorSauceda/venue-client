import { API } from "aws-amplify";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { uuid } from "uuidv4";
import { s3Upload } from "../libs/awsLibs";
import config from "../config";
import AWS from "aws-sdk";

import React, { useState, useEffect } from "react";
//     const style = {
//       marginTop: "45px",
//     };
const AdminMenuInput = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alt, setAlt] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [dietType, setDietType] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const file = React.useRef(null);
  // const s3Function = (file, filenameParameter) => {
  //   const s3 = new AWS.S3({
  //     region: "us-west-2",
  //     params: {
  //       Bucket: "venueappimages",
  //     },
  //   });
  //   let filename = filenameParameter;
  //   return s3
  //     .upload({
  //       Key: filename,
  //       Body: file,
  //       ContentType: file.type,
  //       ACL: "public-write",
  //       CacheControl: "no-cache",
  //     })
  //     .promise();
  // };d

  // const validateForm = () => {
  //   content.length > 0;
  // };

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
  };
  const formatFilename = (str) => {
    return str.replace(/^\w+-/, "");
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
      case "content":
        setContent(event.target.value);
        break;
    }
  };
  // };
  // const validateForm = () => {
  //   return content.length > 0;
  // };
  const handleSubmit = async (event) => {
    let attachement;
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
    setIsLoading(true);
    // this.setState({ isLoading: true });

    let body = {
      name: name,
      description: description,

      alt: alt,
      price: price,
      dietType: dietType,
      inStock: inStock,
    };

    console.log(body);

    try {
      console.log("body: ", body);
      console.log("file: ", file);
      const attachment = file.current
        ? await s3Upload(file.current, "something.jpg")
        : null;
      console.log("attachment: ", attachment);
      body.img = attachement;
      await API.post("vic", "/admin/menuitems", { body });
    } catch (e) {
      console.log(e);
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        //   className="feedback-form"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
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
            value={name}
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
            value={description}
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
            value={dietType}
          />
        </FormControl>
        <FormControl controlId="file">
          <InputLabel>Attachment</InputLabel>
          <Input
            type="file"
            placeholder="please attach an image"
            name="imgSrc"
            onChange={handleFileChange}
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
            onChange={handleChange}
            //   required
            value={alt}
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
            value={price}
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

export default AdminMenuInput;
// export default class AdminMenuInput extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   name: "",
//     //   description: "",
//     //   imgSrc: "",
//     //   alt: "",
//     //   price: "",
//     //   inStock: "",
//     //   dietType: "",
//     //   content: "",
//     //   isLoading: false,
//     // };

//   //   this.handleChange = this.handleChange.bind(this);
//   //   this.handleSubmit = this.handleSubmit.bind(this);
//   //   this.s3Function = this.s3Function.bind(this);
//   // }

//   };
//   render() {
//     const style = {
//       marginTop: "45px",
//     };
//     return (
//       <>
//         <form
//           //   className="feedback-form"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             backgroundColor: "white",
//           }}
//           onSubmit={this.handleSubmit}
//         >
//           <h1 className="text-center">Add items to the Menu</h1>

//           <FormControl controlId="exampleForm.ControlInput1">
//             <InputLabel>Name</InputLabel>
//             <Input
//               type="text"
//               placeholder="name@example.com"
//               name="name"
//               onChange={this.handleChange}
//               //   required
//               value={this.state.name}
//             />
//           </FormControl>
//           <FormControl controlId="exampleForm.ControlInput1">
//             <InputLabel>Description</InputLabel>
//             <Input
//               type="text"
//               placeholder="please add a description of the item"
//               name="description"
//               onChange={this.handleChange}
//               //   required
//               value={this.state.description}
//             />
//           </FormControl>
//           <FormControl controlId="exampleForm.ControlInput1">
//             <InputLabel>Diet Type</InputLabel>
//             <Input
//               type="text"
//               placeholder="How many items are in stock"
//               name="dietType"
//               onChange={this.handleChange}
//               //   required
//               value={this.state.dietType}
//             />
//           </FormControl>
//           <FormControl controlId="file">
//             <InputLabel>Attachment</InputLabel>
//             <Input
//               type="file"
//               placeholder="please attach an image"
//               name="imgSrc"
//               onChange={this.handleFileChange}
//               //   required
//               // value={this.state.imgSrc}
//             />
//           </FormControl>

//           <FormControl controlId="exampleForm.ControlInput1">
//             <InputLabel>Alternate Text</InputLabel>
//             <Input
//               type="text"
//               placeholder="alternate text to display in for screen readers"
//               name="alt"
//               onChange={this.handleChange}
//               //   required
//               value={this.state.alt}
//             />
//           </FormControl>
//           <FormControl controlId="exampleForm.ControlInput1">
//             <InputLabel>Price</InputLabel>
//             <Input
//               type="text"
//               placeholder="How much are you going to sell this product for"
//               name="price"
//               onChange={this.handleChange}
//               //   required
//               value={this.state.price}
//             />
//           </FormControl>
//           <Button type="text" block>
//             Delete Item
//           </Button>

//           <Button type="submit" block>
//             Submit
//           </Button>
//         </form>
//       </>
//     );
//   }
// }
