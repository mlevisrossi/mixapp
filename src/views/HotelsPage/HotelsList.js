import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'assets/css/views/hotelList.css';

import googleIcon from "assets/img/google-icon2.png";
import bookingIcon from "assets/img/booking-icon2.png";
import trivagoIcon from "assets/img/trivago-icon.jpg";

//icons
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function Details(props) {
  let totalOrder = props.totalOrder;
  if(totalOrder){
    return (
      <React.Fragment>
        <Typography
            component="span"
            variant="body2"
            className='inline'
            color="textPrimary"
        >
        <div>
            <div className="mdl-card__supporting-text">
              <CommentIcon titleAccess="Reseñas" className='reviewsIcon'/>
              {"Total de reseñas: " + props.data.reviews} <br />
            </div>
            <div className="mdl-card__supporting-text">
              <MonetizationOnIcon titleAccess="Precio" className='priceIcon'/>
              {props.data.bestPrice == null ? " Mejor precio no disponible" : ("Mejor precio: $" + props.data.bestPrice + " (" + props.data.bestPriceSite + ")")}
              <br />
            </div>                   
        </div>
        </Typography>
    </React.Fragment>
    )

  } else {
    return (
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
                {" " + props.data.rating} <br />
            </div>
            <div className="mdl-card__supporting-text">
                <CommentIcon titleAccess="Reseñas" className='reviewsIcon'/>
                {" " + props.data.reviews} <br />
            </div>
            <div className="mdl-card__supporting-text">
              {props.data.price != "null" ? <AttachMoneyIcon titleAccess="Precio" className='priceIcon'/> : null}
              {props.data.price == "null" ? " Precio no disponible" : (" " + props.data.price)}
            </div>                    
        </div>
        </Typography>
    </React.Fragment>
    )
  }
  return null;
};

function HotelTitle(props) {
  let totalOrder = props.totalOrder;
  let hotel = props.hotel
  if (totalOrder){
    return (
      <div>
        {hotel.name}
        {hotel.sites.google ? <img alt="Google" src={googleIcon} className='siteAvatar' /> : null}
        {hotel.sites.booking ? <img alt="Booking" src={bookingIcon} className='siteAvatar' /> : null}
        {hotel.sites.trivago ? <img alt="Trivago" src={trivagoIcon} className='siteAvatar' /> : null}
      </div>
    )
  } else {
    return (
      hotel.name
    )
  }
}

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
                              <Avatar>
                                {this.props.totalOrder ? hotel.pos : this.props.letter}
                              </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                              primary={
                                <HotelTitle totalOrder={this.props.totalOrder} hotel={hotel}/>
                              }
                              secondary={
                                  <Details totalOrder={this.props.totalOrder} data={hotel}/>
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
