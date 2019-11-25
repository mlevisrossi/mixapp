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
import ListContainer from "views/HotelsPage/ListContainer.js";

//css
import 'assets/css/views/hotelsPage.css';

function List(props) {
  let condition = props.condition;
  if (condition){
    return <ListContainer data={(props.data)}/>;
  }
  return null;
};

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
                        <List condition={(this.props.fileGoogleSaved.Hoteles)!== undefined} data={this.props.fileGoogleSaved.Hoteles} />
                      )
                    },
                    {
                      tabName: "Booking",
                      tabIcon: Hotel,
                      tabContent: (
                        <List condition={(this.props.fileBookingSaved.Hoteles)!== undefined} data={this.props.fileBookingSaved.Hoteles} />
                      )
                    },
                    {
                      tabName: "Expedia",
                      tabIcon: Hotel,
                      tabContent: (
                        <List condition={(this.props.fileExpediaSaved.Hoteles)!== undefined} data={this.props.fileExpediaSaved.Hoteles} />
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
  fileGoogleSaved: PropTypes.object,
  fileBookingSaved: PropTypes.object,
  fileExpediaSaved: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogleSaved: state.fileGoogleSaved,
    fileBookingSaved: state.fileBookingSaved,
    fileExpediaSaved: state.fileExpediaSaved
  };
}

export default connect(mapStateToProps)(HotelsPage);