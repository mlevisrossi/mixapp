/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import HelpIcon from '@material-ui/icons/Help';

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to={"/help"} className={classes.link}>
          <Button
            link={true}
            color="transparent"
            className={classes.navLink}
          >
            <HelpIcon />
            Ayuda
          </Button>
        </Link>
      </ListItem>
    </List>
  );
}
