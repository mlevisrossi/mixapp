import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'assets/css/views/hotelList.css';

//icons
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function Details(props) {
  let condition = props.condition;
  if (condition){
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
                <AttachMoneyIcon titleAccess="Precio" className='priceIcon'/>
                {" " + props.data.price}
            </div>                    
        </div>
        </Typography>
    </React.Fragment>
    )
  }
  return null;
};

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
                              <Avatar>{this.props.letter}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                              primary={hotel.name}
                              secondary={
                                  <Details condition={(hotel.rating)!== undefined} data={hotel}/>
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
