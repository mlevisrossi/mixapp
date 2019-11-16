import React from "react";

import NavPills from "components/NavPills/NavPills.js";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import Hotel from "@material-ui/icons/Hotel";

//css
import 'assets/css/views/hotelList.css';

export default class HotelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='section'>
        <div className='container'>
          <div id="navigation-pills">
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} lg={6}>
                <NavPills
                  active= {1}
                  color="rose"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 4, md: 4 },
                    contentGrid: { xs: 12, sm: 8, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Google",
                      tabIcon: Hotel,
                      tabContent: (
                        <span>
                          {(this.props.fileGoogle).Hoteles.map((hotel, i) => {
							              return <p>{hotel.name}</p>
                          })}
                        </span>
                      )
                    },
                    {
                      tabButton: "Booking",
                      tabIcon: Hotel,
                      tabContent: (
                        <span>
                          {(this.props.fileBooking).Hoteles.map((hotel, i) => {
							              return <p>{hotel.name}</p>
                          })}
                        </span>
                      )
                    },
                    {
                      tabButton: "Expedia",
                      tabIcon: Hotel,
                      tabContent: (
                        <span>
                          {(this.props.fileExpedia).Hoteles.map((hotel, i) => {
							              return <p>{hotel.name}</p>
                          })}
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
  );
  }
}