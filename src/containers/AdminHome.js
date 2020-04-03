import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import AdminMenuItem from "./AdminMenuItem";
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
class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keto: true,
      paleo: true,
      adminmenu: []
    };
  }
  deleteMenuItem = async id => {
    await API.del("vic", `/admin/menuitems/${id}`);
    await this.getMenuItem();
  };
  async getMenuItem() {
    try {
      const responseMenu = await API.get("vic", "/admin/menuitems");

      console.log("response", responseMenu);
      this.setState({ adminmenu: responseMenu });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    await this.getMenuItem();
  }
  handleKetoActive = () => {
    this.setState({ keto: !this.state.keto });
  };

  handlePaleoActive = () => {
    this.setState({ paleo: !this.state.paleo });
  };

  render() {
    console.log("menu:", this.state.adminmenu);
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
            overflow: "auto",
            justifyContent: "space-evenly"
          }}
        >
          {this.state.adminmenu.map((item, key) => {
            return (
              <>
                {item.dietType === "keto" && this.state.keto === true ? (
                  <Grid
                    key={key + "grid"}
                    item
                    xs={12}
                    sm={6}
                    style={{
                      justifyContent: "center",

                      display: "flex",
                      overflow: "auto"
                    }}
                  >
                    <AdminMenuItem
                      key={key + "menu Items"}
                      item={item}
                      addToCart={this.props.addToCart}
                      classes={classes}
                      appProps={this.props}
                      deleteMenuItem={this.deleteMenuItem}
                    />
                  </Grid>
                ) : null}
                {item.dietType === "paleo" && this.state.paleo === true ? (
                  <Grid
                    item
                    xs={12}
                    key={key + "grid1"}
                    sm={3}
                    style={{
                      marginRight: "1rem",
                      height: "48rem",
                      display: "flex",
                      overflow: "auto"
                    }}
                  >
                    <AdminMenuItem
                      item={item}
                      key={key}
                      addToCart={this.props.addToCart}
                      classes={classes}
                      deleteMenuItem={this.deleteMenuItem}
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

export default AdminHome;
