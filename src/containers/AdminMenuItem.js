import React from "react";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

function AdminMenuItem(props) {
  const { item } = props;

  return (
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
      <CardContent>
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
          <Button
            variant="contained"
            style={{ backgroundColor: "#f44336" }}
            onClick={() => props.deleteMenuItem(item._id)}
          >
            Remove Item From Menu
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#eaebf1" }}
            onClick={() => props.updateMenuItem(item._id)}
          >
            <Link
              to={{
                pathname: `/admin/menuitems/${item._id}/update`,
              }}
            >
              Update Item
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default AdminMenuItem;
