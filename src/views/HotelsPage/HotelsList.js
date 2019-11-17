import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

//icons
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  ratingIcon: {
    color: '#E7711B',
    fontSize: '16px',
    verticalAlign: 'middle',
    position: 'relative',
    top: '-1px'
  },
  priceIcon: {
    color: 'green',
    fontSize: '16px',
    verticalAlign: 'middle',
    position: 'relative',
    top: '-1px'
  },
  reviewsIcon: {
    color: '#7293E5',
    fontSize: '16px',
    verticalAlign: 'middle',
    position: 'relative',
    top: '-1px'
  }

}));

export default function HotelsList({hotelsList}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {hotelsList.map((hotel, i) => {
        return (
            <div> 
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>H</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={hotel.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                <div>
                                    <div class="mdl-card__supporting-text">
                                        <StarIcon titleAccess="Reputación" className={classes.ratingIcon} />
                                        {" " + hotel.rating} <br />
                                    </div>
                                    <div class="mdl-card__supporting-text">
                                        <CommentIcon titleAccess="Reseñas" className={classes.reviewsIcon}/>
                                        {" " + hotel.reviews} <br />
                                    </div>
                                    <div class="mdl-card__supporting-text">
                                        <AttachMoneyIcon titleAccess="Precio" className={classes.priceIcon}/>
                                        {" " + hotel.price}
                                    </div>                    
                                </div>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div> 
        )
     })}  
    </List>
  );
}
