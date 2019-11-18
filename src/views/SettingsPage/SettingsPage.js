import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//css
import 'assets/css/views/settingsPage.css';

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import Parallax from "components/Parallax/Parallax.js";
import SettingsForm from "views/SettingsPage/SettingsForm.js";

import { compare } from "utils/fileUtils.js";
import { createDictionary } from "utils/dictionary.js";

//Actions
import { selectGoogleFileAction, selectBookingFileAction, selectExpediaFileAction } from '../../redux/actions/FileActions.js';
import { createDictAction } from '../../redux/actions/DictionaryActions.js';

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGoogleFileChange = (event) => {
    event.preventDefault()
    let fileGoogle = event.target.files[0]
    const { selectGoogleFileAction } = this.props;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      let sorted = json.Hoteles.sort(compare);
      json.Hoteles = sorted
      selectGoogleFileAction(json)
    }
    reader.readAsText(fileGoogle)
  }

  handleBookingFileChange = (event) => {
    event.preventDefault()
    let fileBooking = event.target.files[0]
    const { selectBookingFileAction } = this.props;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      let sorted = json.Hoteles.sort(compare);
      json.Hoteles = sorted
      selectBookingFileAction(json)
    }
    reader.readAsText(fileBooking)
  }

  handleExpediaFileChange = (event) => {
    event.preventDefault()
    let fileExpedia = event.target.files[0]
    const { selectExpediaFileAction } = this.props;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      let sorted = json.Hoteles.sort(compare);
      json.Hoteles = sorted
      selectExpediaFileAction(json)
    }
    reader.readAsText(fileExpedia)
  }

  handleToggleChange = (event) => {
    event.preventDefault()
    //TODO
  }

  handleSubmit = (event) => {
    const { createDictAction } = this.props;
    console.log("Submit clicked");
    let dict = createDictionary(this.props.fileGoogle, this.props.fileBooking, this.props.fileExpedia);
    createDictAction(dict);
    //TODO
  }

  // onClick = (e, t, rowInfo) => {
  //   e.preventDefault()
  //   const { selectAction } = this.props;
  //   this.setState({
  //     index: rowInfo.index
  //   })
  //   selectAction(rowInfo.original);
  // }


  render() {
    // const { localPopulation } = this.props;
    // return (
    //   <div>
    //     <Menu onClickDetails={this.onClickDetails}/>
    //     <Table index={this.state.index} localPopulationList={localPopulation} onClick={this.onClick}/>
    //   </div>
    // );
    return (
      <div>
        <Parallax small filter image={require("assets/img/background3.jpg")} />
        <div className='main mainRaised' > 
          <div>
            <div className='container'>
              <GridContainer justify="center">
                    <SettingsForm handleGoogleFileChange={this.handleGoogleFileChange} handleBookingFileChange={this.handleBookingFileChange} handleExpediaFileChange={this.handleExpediaFileChange} handleSubmit={this.handleSubmit}/>
              </GridContainer>
          </div>    
        </div>
        </div>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  fileGoogle: PropTypes.object,
  fileBooking: PropTypes.object,
  fileExpedia: PropTypes.object,
  hotelsDict: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogle: state.fileGoogle,
    fileBooking: state.fileBooking,
    fileExpedia: state.fileExpedia,
    hotelsDict: state.hotelsDict
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGoogleFileAction: (fileGoogle) => {dispatch(selectGoogleFileAction(fileGoogle));},
    selectBookingFileAction: (fileBooking) => {dispatch(selectBookingFileAction(fileBooking));},
    selectExpediaFileAction: (fileExpedia) => {dispatch(selectExpediaFileAction(fileExpedia));},
    createDictAction: (hotelsDict) => {dispatch(createDictAction(hotelsDict));}
  }
}   

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
