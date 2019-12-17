import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ListContainer from "views/HotelsPage/ListContainer.js";
import BeatLoader from 'react-spinners/BeatLoader';

import { mapToHotelNames } from "utils/dictionary.js";

//css
import 'assets/css/views/hotelsPage.css';

function List(props) {
  let condition = props.condition;
  if (condition){
    return <ListContainer data={(props.data)} pageLimit={10} letter={(props.letter)} totalOrder={false} maxRating={props.maxRating} />;
  }
  return null;
};

function TotalOrderList(props) {
  let condition = props.condition;
  let loading = props.loading;
  if (condition && !loading){
    let hotels = mapToHotelNames(props.dict, props.data, props.google, props.booking, props.trivago);
    return <ListContainer data={(hotels)} pageLimit={15} letter={(props.letter)} totalOrder={true}/>;
  } else {
    if (loading) {
      return <div className='loadingDiv'> <BeatLoader sizeUnit={'px'} size={20} color={'#6AACAF'} loading={true} /> </div>;
    } else {
      return null;
    }
  }
};

export class HotelsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='hotelsSection' >
            <GridContainer alignItems="flex-start" justify="center">
              <GridItem xs={7}>
                <div className='settings-title'>
                  <h2>Ordenes de Hoteles</h2>
                  <br />
                </div>
                <CustomTabs
                  headerColor= 'primary'
                  tabs={[
                    {
                      tabName: "Google",
                      tabContent: (
                        <List condition={(this.props.fileGoogleSaved.Hoteles)!== undefined} data={this.props.fileGoogleSaved.Hoteles} letter={"G"} maxRating={5}/>
                      )
                    },
                    {
                      tabName: "Booking",
                      tabContent: (
                        <List condition={(this.props.fileBookingSaved.Hoteles)!== undefined} data={this.props.fileBookingSaved.Hoteles} letter={"B"} maxRating={10}/>
                      )
                    },
                    {
                      tabName: "trivago",
                      tabContent: (
                        <List condition={(this.props.fileTrivagoSaved.Hoteles)!== undefined} data={this.props.fileTrivagoSaved.Hoteles} letter={"T"} maxRating={10}/>
                      )
                    },
                    {
                      tabName: "Orden total",
                      tabContent: (
                        <TotalOrderList 
                          condition={(this.props.totalOrder.totalOrder)!== undefined} 
                          data={this.props.totalOrder.totalOrder} 
                          dict={this.props.hotelsDict} 
                          google={this.props.fileGoogleSaved.Hoteles}
                          booking={this.props.fileBookingSaved.Hoteles}
                          trivago={this.props.fileTrivagoSaved.Hoteles}
                          loading={this.props.loading.loading}
                        />
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
  hotelsDict: PropTypes.object,
  loading: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogleSaved: state.fileGoogleSaved,
    fileBookingSaved: state.fileBookingSaved,
    fileTrivagoSaved: state.fileTrivagoSaved,
    totalOrder: state.totalOrder,
    hotelsDict: state.hotelsDict,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(HotelsPage);