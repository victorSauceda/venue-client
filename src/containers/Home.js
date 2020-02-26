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
import MenuItemComp from "./MenuItem";
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
    display: "auto",
    flexDirection: "row",
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

    // items.reduce((acc, next) => {
    //   return {
    //     ...acc(
    //       (this.state = {
    //         [acc.name]: { quantity: 1 }
    //       })
    //     )
    //   };
    // });
  }

  render() {
    return (
      <div

      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   flexDirection: "column"
      // }}
      >
        <Grid
          container
          direction="row"
          spacing={3}
          style={{ display: "flex", overflow: "auto" }}
        >
          {items.map((item, key) => {
            return (
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  marginRight: "1rem",
                  height: "43rem",
                  display: "flex",
                  overflow: "auto"
                }}
              >
                <MenuItemComp
                  item={item}
                  addToCart={this.props.addToCart}
                  classes={classes}
                />
              </Grid>
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
