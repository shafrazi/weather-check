import React from "react";
import {
  Switch,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

function Header(props) {
  return (
    <header>
      <h1 className="logo">Weather Check</h1>
      <div className="unit-change">
        <FormControl component="fieldset">
          <FormGroup row>
            <FormControlLabel
              value="F"
              control={
                <Switch
                  checked={props.isImperial}
                  color="default"
                  onChange={props.switchUnits}
                />
              }
              label="°F"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </div>
    </header>
  );
}

export default Header;
