/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Hotel } from "@material-ui/icons";
import SettingsIcon from '@material-ui/icons/Settings';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to={"/settings"} className={classes.link}>
          <Button
            link={true}
            color="transparent"
            className={classes.navLink}
          >
            <SettingsIcon />
            Configuración
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Listas de hoteles"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Hotel}
          dropdownList={[
            <Link to={"/hotels"} className={classes.dropdownLink} >
              Hoteles Google
            </Link>,
            <Link to={"/hotels"} className={classes.dropdownLink}>
              Hoteles Booking
            </Link>,
            <Link to={"/hotels"} className={classes.dropdownLink}>
              Hoteles Expedia
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={"/"} className={classes.link}>
          <Button
            color="transparent"
            className={classes.navLink}
          >
            Orden total de hoteles
          </Button>
        </Link>
      </ListItem>
    </List>
  );
}
