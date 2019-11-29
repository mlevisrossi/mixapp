import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Hotel from "@material-ui/icons/Hotel";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ListContainer from "views/HotelsPage/ListContainer.js";

import { mapToHotelNames } from "utils/dictionary.js";

//css
import 'assets/css/views/hotelsPage.css';

function List(props) {
  let condition = props.condition;
  if (condition){
    return <ListContainer data={(props.data)} pageLimit={10} letter={(props.letter)}/>;
  }
  return null;
};

function TotalOrderList(props) {
  let condition = props.condition;
  if (condition){
    let hotels = mapToHotelNames(props.dict, props.data);
    return <ListContainer data={(hotels)} pageLimit={15} letter={(props.letter)}/>;
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
                        <List condition={(this.props.fileGoogleSaved.Hoteles)!== undefined} data={this.props.fileGoogleSaved.Hoteles} letter={"G"}/>
                      )
                    },
                    {
                      tabName: "Booking",
                      tabIcon: Hotel,
                      tabContent: (
                        <List condition={(this.props.fileBookingSaved.Hoteles)!== undefined} data={this.props.fileBookingSaved.Hoteles} letter={"B"}/>
                      )
                    },
                    {
                      tabName: "trivago",
                      tabIcon: Hotel,
                      tabContent: (
                        <List condition={(this.props.fileTrivagoSaved.Hoteles)!== undefined} data={this.props.fileTrivagoSaved.Hoteles} letter={"T"} />
                      )
                    },
                    {
                      tabName: "Orden total",
                      tabIcon: Hotel,
                      tabContent: (
                        <TotalOrderList condition={(this.props.totalOrder.totalOrder)!== undefined} data={this.props.totalOrder.totalOrder} dict={this.props.hotelsDict} letter={"H"}/>
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
  fileTrivagoSaved: PropTypes.object,
  totalOrder: PropTypes.object,
  hotelsDict: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogleSaved: state.fileGoogleSaved,
    fileBookingSaved: state.fileBookingSaved,
    fileTrivagoSaved: state.fileTrivagoSaved,
    totalOrder: state.totalOrder,
    hotelsDict: state.hotelsDict
  };
}

export default connect(mapStateToProps)(HotelsPage);