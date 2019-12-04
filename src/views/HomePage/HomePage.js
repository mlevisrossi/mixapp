import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import SettingsPage from "views/SettingsPage/SettingsPage.js";
import HotelsPage from "views/HotelsPage/HotelsPage.js";

import styles from "assets/jss/material-kit-react/views/homePage.js";

import logo from "assets/img/logo.png";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  return (
    <div>
      <Parallax small image={require("assets/img/background03.jpg")}>
      <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>M I X A P P</h1>
                <h2 className={classes.subtitle}>
                  <b>Integración de servicios de sistemas de reputación</b>
                </h2>
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
