import React from "react";

import { VictoryPie } from "victory";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminOrders from "./AdminOrders";
import { API } from "aws-amplify";
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableRow,
  Grid
} from "@material-ui/core";
import TableForOrders from "./TableForOrders";
import AdminMenuInput from "./AdminMenuInput";
import AdminMenuItem from "./AdminMenuItem";
import Search from "./Search";

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
    marginBottom: "20px !important",
    width: "35% !important "
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
    console.log("child props at admin: ", props);
    super(props);
    this.state = {
      // transactions: this.props.appProps.transactions,
      cartItems: [],
      isClicked: false,
      isAddMenuClicked: false,
      // menuItems: this.props.appProps.menuItems,
      keto: true,
      paleo: true,
      isMenuClicked: false
    };
  }

  deleteMenuItem = async id => {
    await API.del("vic", `/admin/menuitems/${id}`);
    // await this.getMenuItem();
  };
  updateMenuItem = async id => {
    await API.put("vic", `/admin/menuitems/${id}`);
    // await this.getMenuItem();
  };
  handleKetoActive = () => {
    this.setState({ keto: !this.state.keto });
  };

  handlePaleoActive = () => {
    this.setState({ paleo: !this.state.paleo });
  };

  render() {
    let filteredArray = [];
    this.props.appProps.menuItems.forEach((item, idx) => {
      // console.log("item in admin foreach: ", item);
      filteredArray.push(item);
      // console.log("filtered array: ", filteredArray);
      // item.cartItems.forEach(element => {
      //  filteredArray.push(element);
      // });
    });

    let veganCount = 0;
    let ketoCount = 0;
    let paleoCount = 0;
    filteredArray.map(item => {
      if (item.dietType == "vegan") {
        veganCount++;
      }
      if (item.dietType == "keto") {
        ketoCount++;
      }
      if (item.dietType == "paleo") {
        paleoCount++;
      }
    });
    // console.log("vegan count:", veganCount);
    // console.log("keto count:", ketoCount);
    // console.log("paleo count:", paleoCount);
    console.log("transactions at admin", this.state.transactions);
    console.log("menu items at admin", this.state.menuItems);

    return (
      <div>
        <div style={{ float: "left", clear: "left", marginLeft: "-100px" }}>
          <VictoryPie
            height={190}
            data={[
              { x: "Keto", y: ketoCount },
              { x: "Paleo", y: paleoCount },
              { x: "Vegan", y: veganCount }
            ]}
          />
        </div>
        <div>
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
            <div style={{ float: "right" }}>
              {" "}
              <Button
                variant="contained"
                style={{ backgroundColor: "#eaebf1", display: "flex" }}
                onClick={() => this.setState({ isClicked: true })}
              >
                View Orders
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: "5px",
                  backgroundColor: "#eaebf1",
                  display: "flex"
                }}
                onClick={() => this.setState({ isAddMenuClicked: true })}
              >
                Add Menu Items
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: "5px",
                  backgroundColor: "#eaebf1",
                  display: "flex"
                }}
              >
                <Link
                  style={{
                    color: "black",

                    fontSize: "2.5rem"
                  }}
                  onClick={() => this.setState({ isMenuClicked: true })}
                  color="default"
                  to={{
                    pathname: "/admin/menuitems",
                    state: { menu: this.state.menuItems }
                  }}
                >
                  View Menu
                </Link>
              </Button>
              {this.state.isAddMenuClicked ? <AdminMenuInput /> : null}
              {this.state.isClicked ? (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>

                        <TableCell align="right">Order_Id</TableCell>
                        <TableCell align="right">Items Ordered</TableCell>

                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.appProps.transactions.map(
                        (transaction, idx) => {
                          return <AdminOrders transaction={transaction} />;
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </div>
            {this.state.isMenuClicked &&
              this.props.appProps.menuItems.map((item, key) => {
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
                          appProps={{ ...this.props }}
                          deleteMenuItem={this.deleteMenuItem}
                          updateMenuItem={this.updateMenuItem}
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
                          appProps={{
                            props: this.props,
                            menu: this.state.menuItems
                          }}
                          deleteMenuItem={this.deleteMenuItem}
                          updateMenuItem={this.updateMenuItem}
                        />
                      </Grid>
                    ) : null}
                  </>
                );
              })}
          </Grid>
        </div>
      </div>
    );
  }
}
export default Admin;
