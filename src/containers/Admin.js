import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import items from "../data/transactions";
import { VictoryPie } from "victory";
import transactions from "../data/transactions";
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
    super(props);
    this.state = {
      cartItems: []
    };
  }
  render() {
    console.log("this is a sanity check", this.props.cartItems);
    let filteredArray = [];
    transactions.map(item => {
      item.itemsOrdered.forEach(element => {
        filteredArray.push(element);
      });
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
    console.log("vegan count:", veganCount);
    console.log("keto count:", ketoCount);
    console.log("paleo count:", paleoCount);

    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>

                <TableCell align="right">Restaruant Name</TableCell>
                <TableCell align="right">Order_Id</TableCell>
                <TableCell align="right">Items Ordered</TableCell>

                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.customerFirstName} {row.customerLastName}
                  </TableCell>
                  <TableCell align="right">{row.restaurantName}</TableCell>
                  <TableCell align="right">{row.orderId}</TableCell>
                  <TableCell align="right">
                    {row.itemsOrdered[0].name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}{" "}
              {/* <TableRow key="1">
                <TableCell component="th" scope="row">
                  John Doe
                </TableCell>
                <TableCell align="right">Keto's Diner</TableCell>
                <TableCell align="right">123456</TableCell>
                <TableCell align="right">
                  keto chicken, fries, rice, ham, bannana, tomato, onion,
                  cabbage, corn, olives, sausage, turkey, chorizo, feta,
                  pineapple
                </TableCell>
                <TableCell align="right">4</TableCell>
                <TableCell align="right">Keto</TableCell>
                <TableCell align="right">$23</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
        <VictoryPie
          data={[
            { x: "Keto", y: ketoCount },
            { x: "Paleo", y: paleoCount },
            { x: "Vegan", y: veganCount }
          ]}
        />

        <Card
          style={{ marginTop: "5rem", marginBottom: "20px", width: "30%" }}
          className={classes.card}
        >
          <h1
            style={{
              marginTop: "25px",
              textAlign: "center",
              fontFamily: "Rock Salt",
              color: "blue",

              textAlign: "center"
            }}
          >
            John Doe
          </h1>
          <h3
            style={{
              marginBottom: "15px",
              marginTop: "10px",
              textAlign: "center"
            }}
          >
            <em>Customer_Id: 1234</em>
            <br />
            <em>Order_Id: 1234</em>
            <br />
            <em>Restaruant_Id: 4566</em>

            {/* <img src={item.dietTypeIcon} height="20" width="20" /> */}
          </h3>

          <div
            style={{
              marginTop: "4rem",
              display: "center",
              textAlign: "center"
            }}
          >
            <Typography>
              <h1>Order </h1>
            </Typography>

            <Typography>
              Item:<strong>Keto Chicken</strong>
            </Typography>
            <Typography>
              Diet:<strong>Keto</strong>
            </Typography>

            <Typography>
              Quantity:<strong>2</strong>
            </Typography>
          </div>

          <CardContent className={classes.cardContent}>
            <Typography
              style={{ textAlign: "center", marginTop: "7rem" }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Sub Total: $40
            </Typography>

            <Typography style={{ textAlign: "center", height: "10rem" }}>
              <h1>Total: $45</h1>
            </Typography>

            <span> </span>

            {/* <Typography>Ingredients:{item.ingredients}</Typography> */}
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default Admin;
