import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels(props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            style={{
              justifyContent: "space-evenly",
              display: "flex",
              marginLeft: "20px !important"
            }}
            checked={props.paleoActive}
            onChange={props.handlePaleo}
            value="checkedA"
          />
        }
        label="Paleo"
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.ketoActive}
            onChange={props.handleKeto}
            value="checkedB"
            color="primary"
          />
        }
        label="Keto"
      />
    </FormGroup>
  );
}
