import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
const classes = {
  icon: {
    // marginRight: theme.spacing(2)
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper
    // padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    // marginTop: theme.spacing(4)
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px !important"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  textAlignMe: {
    textAlign: "center"
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6)
  }
};
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }
  render() {
    console.log("this is a sanity check", this.props.cartItems);

    return (
      <Card style={{ marginBottom: "20px" }} className={classes.card}>
        <h1
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontFamily: "Rock Salt",
            color: "blue",

            textAlign: "center"
          }}
        >
          what what
        </h1>
        <h3
          style={{
            marginBottom: "15px",
            marginTop: "10px",
            textAlign: "center"
          }}
        >
          <em>{this.props.cartItems}</em>

          {/* <img src={item.dietTypeIcon} height="20" width="20" /> */}
        </h3>
        <p
          style={{
            textAlign: "right",
            marginRight: "1rem",
            marginBottom: ".4rem"
          }}
        >
          {this.props.cartItems} miles{" "}
        </p>

        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            marginTop: "20px"
          }}
        >
          <Typography>
            Price:<strong>${this.props.adder}</strong>
          </Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <Typography
            style={{ textAlign: "center" }}
            gutterBottom
            variant="h5"
            component="h2"
          ></Typography>

          <Typography
            style={{ textAlign: "center", height: "10rem" }}
          ></Typography>

          <span> </span>

          {/* <Typography>Ingredients:{item.ingredients}</Typography> */}
        </CardContent>
      </Card>
    );
  }
}
export default Admin;
