import React from "react";
import Button from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import Album from "Album";
import { increment, decrement } from "../store/reducers/stepCounter";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import items from "../ghettoDB";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CardMedia from "@material-ui/core/CardMedia";

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
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      quantity: event.target.value
    });
  };
  render() {
    return (
      <div
        className="container"
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   flexDirection: "column"
        // }}
      >
        <Grid xs={12} sm={6} md={4}>
          {items.map((item, key) => {
            return (
              <Card
                style={{ marginBottom: "20px" }}
                className={classes.card}
                key={key}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  style={{ height: "16rem", width: "22rem" }}
                  height="142"
                  width="142"
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    style={{ textAlign: "center" }}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  ></Typography>

                  <Typography style={{ textAlign: "center" }}>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                  <Typography>Price:{item.price}</Typography>
                  <Typography>Distance:{item.distance}</Typography>
                  <Typography>Calories:{item.calories}</Typography>
                  <Typography>Diet Type:{item.dietType}</Typography>
                  <Typography>Ingredients:{item.ingredients}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  onClick={() => this.props.addToCart(item)}
                >
                  Add to cart
                </Button>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value="0"
                    onChange="4"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Card>
            );
          })}
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     stepCounter: state.stepCounter
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       increment: () => increment(),
//       decrement: () => decrement()
//     },
//     dispatch
//   );
// };

export default Home;

{
  /* <CardMedia
            wide
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
            alt="kljd;kadsfl;ksfa"
          /> */
}
