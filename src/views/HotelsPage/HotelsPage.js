import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import HotelsList from "views/HotelsPage/HotelsList.js";
import Hotel from "@material-ui/icons/Hotel";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

//css
import 'assets/css/views/hotelsPage.css';

export class HotelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='hotelsSection' >
            <GridContainer alignItems="flex-start" justify="center">
              <GridItem xs={8}>
                <div className='settings-title'>
                  <h2>Ordenes de Hoteles</h2>
                  <br />
                </div>
                <CustomTabs
                  headerColor="info"
                  tabs={[
                    {
                      tabName: "Google",
                      tabIcon: Hotel,
                      tabContent: (
                        <HotelsList hotelsList={(this.props.fileGoogle.Hoteles)} className='textCenter'/>
                      )
                    },
                    {
                      tabName: "Booking",
                      tabIcon: Hotel,
                      tabContent: (
                        <HotelsList hotelsList={(this.props.fileBooking.Hoteles)} className='textCenter'/>
                      )
                    },
                    {
                      tabName: "Expedia",
                      tabIcon: Hotel,
                      tabContent: (
                        <HotelsList hotelsList={(this.props.fileExpedia.Hoteles)} className='textCenter'/>
                      )
                    },
                    {
                      tabName: "Orden total",
                      tabIcon: Hotel,
                      tabContent: (
                        <p>Aca va el resultado de multicontext</p>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
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