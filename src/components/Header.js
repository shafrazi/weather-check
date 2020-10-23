import React from "react";
import { Switch } from "@material-ui/core";

function Header() {
  return (
    <header>
      <h1 className="logo">Weather Check</h1>
      <div className="unit-change">
        <Switch checked={true} color="default" />
        <p>°F</p>
      </div>
    </header>
  );
}

export default Header;
