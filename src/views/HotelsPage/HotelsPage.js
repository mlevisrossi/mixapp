import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import HotelListContainer from "views/HotelsPage/HotelListContainer.js";
import HotelsList from "views/HotelsPage/HotelsList.js";
import Hotel from "@material-ui/icons/Hotel";

//css
import 'assets/css/views/hotelsPage.css';

export class HotelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Parallax small filter image={require("assets/img/background3.jpg")}>
          <div className='container'>
            <GridContainer>
              <GridItem>
                <div className='brand'>
                  <h1 className='title'>MICA APP.</h1>
                  <h3 className='subtitle'>
                    Ordenes de hoteles en las diferentes plataformas
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className='main mainRaised'>
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
                          <HotelsList hotelsList={(this.props.fileGoogle.Hoteles)}/>
                        )
                      },
                      {
                        tabButton: "Booking",
                        tabIcon: Hotel,
                        tabContent: (
                          <HotelsList hotelsList={(this.props.fileBooking.Hoteles)}/>
                        )
                      },
                      {
                        tabButton: "Expedia",
                        tabIcon: Hotel,
                        tabContent: (
                          <HotelsList hotelsList={(this.props.fileExpedia.Hoteles)}/>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

HotelsPage.propTypes = {
  fileGoogle: PropTypes.object,
  fileBooking: PropTypes.object,
  fileExpedia: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogle: state.fileGoogle,
    fileBooking: state.fileBooking,
    fileExpedia: state.fileExpedia
  };
}

export default connect(mapStateToProps)(HotelsPage);