import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReactPaginate from 'react-paginate';
import 'assets/css/views/hotelList.css';

//icons
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default class HotelsList extends React.Component {

    render(){
      if(this.props.hotelsList !== undefined) {
      return (
        <div>
          <List className='root'>
            {this.props.hotelsList.map((hotel, i) => {
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
                                          className='inline'
                                          color="textPrimary"
                                      >
                                      <div>
                                          <div className="mdl-card__supporting-text">
                                              <StarIcon titleAccess="Reputación" className='ratingIcon'/>
                                              {" " + hotel.rating} <br />
                                          </div>
                                          <div className="mdl-card__supporting-text">
                                              <CommentIcon titleAccess="Reseñas" className='reviewsIcon'/>
                                              {" " + hotel.reviews} <br />
                                          </div>
                                          <div className="mdl-card__supporting-text">
                                              <AttachMoneyIcon titleAccess="Precio" className='priceIcon'/>
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
          
        </div>
      );
      } else {
        return (
          <div> Por favor, seleccione un archivo. </div>
        )
    }
  }
}
