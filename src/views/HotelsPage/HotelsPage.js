import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import HotelList from "views/HotelsPage/HotelList.js";

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
          <HotelList fileGoogle={this.props.fileGoogle} fileBooking={this.props.fileBooking} fileExpedia={this.props.fileExpedia}/>
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