import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import AdminMenuItem from "./AdminMenuItem";
import Search from "./Search";
import { API } from "aws-amplify";

const AdminViewMenuPage = (props) => {
  const [paleo, setPaleo] = useState(true);
  const [keto, setKeto] = useState(true);
  const handleKetoActive = () => {
    setKeto(!keto);
  };
  const handlePaleoActive = () => {
    setPaleo(!paleo);
  };
  const deleteMenuItem = async (id) => {
    await API.del("vic", `/admin/menuitems/${id}`);
    // await this.getMenuItem();
  };
  const updateMenuItem = async (id) => {
    await API.put("vic", `/admin/menuitems/${id}`);
    // await this.getMenuItem();
  };

  return (
    <>
      <div>
        <Search
          ketoActive={keto}
          paleoActive={paleo}
          handleKeto={handleKetoActive}
          handlePaleo={handlePaleoActive}
        />
      </div>
      <Grid
        // className={classes.paper}
        container
        direction="row"
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          overflow: "auto",
        }}
      >
        {props.appProps.menuItems.map((item, key) => (
          <React.Fragment>
            {item.dietType === "keto" && keto ? (
              <Grid
                key={key + "grid"}
                item
                xs={12}
                sm={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflow: "auto",
                }}
              >
                <AdminMenuItem
                  key={key + "menu Items"}
                  item={item}
                  addToCart={props.addToCart}
                  //   classes={classes}
                  appProps={{ ...props }}
                  deleteMenuItem={deleteMenuItem}
                  updateMenuItem={updateMenuItem}
                />
              </Grid>
            ) : null}
            {item.dietType === "paleo" && paleo ? (
              <Grid
                item
                key={key}
                xs={12}
                sm={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflow: "auto",
                }}
              >
                <AdminMenuItem
                  item={item}
                  key={key}
                  addToCart={props.addToCart}
                  //   classes={classes}
                  appProps={{ ...props }}
                  deleteMenuItem={deleteMenuItem}
                  updateMenuItem={updateMenuItem}
                />
              </Grid>
            ) : null}
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};

export default AdminViewMenuPage;
