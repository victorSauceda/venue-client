import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import MenuItemComp from "./MenuItem";
import Search from "./Search";
import { API } from "aws-amplify";

const classes = {
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
  }
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    // console.log("HOME PROPS");
    // console.log(props);

    this.state = {
      keto: true,
      paleo: true,
      menu: []
    };
  }

  async componentDidMount() {
    try {
      const responseMenu = await API.get("vic", "/menuitems");
      // console.log("response", responseMenu);
      this.setState({ menu: responseMenu });
    } catch (e) {
      console.log(e);
    }
  }
  handleKetoActive = () => {
    this.setState({ keto: !this.state.keto });
  };

  handlePaleoActive = () => {
    this.setState({ paleo: !this.state.paleo });
  };

  render() {
    // console.log("menu:", this.state.menu);
    return (
      <div

      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   flexDirection: "column"
      // }}
      >
        <Search
          ketoActive={this.state.keto}
          paleoActive={this.state.paleo}
          handleKeto={this.handleKetoActive}
          handlePaleo={this.handlePaleoActive}
        />
        <Grid
          container
          direction="row"
          spacing={3}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            overflow: "auto"
          }}
        >
          {this.state.menu.map((item, key) => {
            return (
              <>
                {item.dietType === "keto" && this.state.keto === true ? (
                  <Grid
                    key={key}
                    item
                    xs={12}
                    sm={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      overflow: "auto"
                    }}
                  >
                    <MenuItemComp
                      key={key}
                      item={item}
                      addToCart={this.props.addToCart}
                      classes={classes}
                      appProps={this.props}
                    />
                  </Grid>
                ) : null}
                {item.dietType === "paleo" && this.state.paleo === true ? (
                  <Grid
                    item
                    xs={12}
                    key={key + "grid1"}
                    sm={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      overflow: "auto"
                    }}
                  >
                    <MenuItemComp
                      item={item}
                      key={key + "menu1"}
                      addToCart={this.props.appProps.addToCart}
                      classes={classes}
                      appProps={this.props}
                    />
                  </Grid>
                ) : null}
              </>
            );
          })}
        </Grid>
        <ShoppingCartIcon />
      </div>
    );
  }
}

// <ShoppingCartIcon
//                   style={{
//                     position: "fixed",
//                     bottom: "560px",
//                     right: "1000px"
//                   }}
//                 />

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
