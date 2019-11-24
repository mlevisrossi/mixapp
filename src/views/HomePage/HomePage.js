import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import SettingsPage from "views/SettingsPage/SettingsPage.js";
import HotelsPage from "views/HotelsPage/HotelsPage.js";

import styles from "assets/jss/material-kit-react/views/homePage.js";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  return (
    <div>
      <Parallax small filter image={require("assets/img/vacations.jpg")}>
      <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Mica App.</h1>
                <h3 className={classes.subtitle}>
                  Integración de servicios de sistemas de reputación
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SettingsPage/>
        <HotelsPage/>
      </div>
    </div>
  );
}
