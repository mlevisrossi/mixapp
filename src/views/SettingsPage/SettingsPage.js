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
import GridItem from "components/Grid/GridItem.js";

import { compare } from "utils/fileUtils.js";
import { createDictionary } from "utils/dictionary.js";
import { generateTuples } from "utils/tuplesGenerator.js";
import { getExtendedOrderFromApiAsync } from "services/connectionService.js";
import arrayMove from 'array-move';

//Actions
import { selectGoogleFileAction, selectBookingFileAction, selectExpediaFileAction } from '../../redux/actions/FileActions.js';
import { createDictAction } from '../../redux/actions/DictionaryActions.js';

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taxonomyItems: ['Google', 'Booking', 'Expedia'],
      minComments: 0
    }
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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({taxonomyItems}) => ({
      taxonomyItems: arrayMove(taxonomyItems, oldIndex, newIndex),
    }));
  };

  handleSliderChange = (minComments) => {
    this.setState(({minComments}) => ({
      minComments: minComments
    }));
  };

  constructTaxonomyArray = (taxonomyItems) => {
    let taxonomyArray = new Array();
    let googleIndex = taxonomyItems.indexOf('Google');
    taxonomyArray.push(googleIndex + 1);
    let bookingIndex = taxonomyItems.indexOf('Booking');
    taxonomyArray.push(bookingIndex + 1);
    let expediaIndex = taxonomyItems.indexOf('Expedia');
    taxonomyArray.push(expediaIndex + 1);

    return taxonomyArray
  }

  handleSubmit = (event) => {

    //guardar los archivos en redux
    //tomar valor de taxonomia
    //Crear diccionario y guardarlo en redux
    //Generar tuplas y hacer llamada a api
    let taxonomyArray = this.constructTaxonomyArray(this.state.taxonomyItems);

    const { createDictAction } = this.props;
    let dictionary = createDictionary(this.props.fileGoogle, this.props.fileBooking, this.props.fileExpedia);
    createDictAction(dictionary);

    let googleTuples = generateTuples(this.props.fileGoogle, dictionary);
    let bookingTuples = generateTuples(this.props.fileBooking, dictionary);
    let expediaTuples = generateTuples(this.props.fileExpedia, dictionary);

    getExtendedOrderFromApiAsync(
      {
        "googleTuples": googleTuples,
        "bookingTuples": bookingTuples,
        "expediaTuples": expediaTuples,
        "taxonomy": taxonomyArray
      }
    );
    
  }

  render() {
    return (
        <div className='settings-sections'>
          <div className='settings-container'>
            <SettingsForm 
              handleGoogleFileChange={this.handleGoogleFileChange} 
              handleBookingFileChange={this.handleBookingFileChange} 
              handleExpediaFileChange={this.handleExpediaFileChange} 
              handleSubmit={this.handleSubmit}
              taxonomyItems={this.state.taxonomyItems}
              onSortEnd={this.onSortEnd}
            />
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
