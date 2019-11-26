import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//css
import 'assets/css/views/settingsPage.css';

// core components
import SettingsForm from "views/SettingsPage/SettingsForm.js";

import { compare } from "utils/fileUtils.js";
import { createDictionary } from "utils/dictionary.js";
import { generateTuples } from "utils/tuplesGenerator.js";
import arrayMove from 'array-move';

//Actions
import { 
  selectGoogleFileAction, 
  selectBookingFileAction, 
  selectExpediaFileAction, 
  unSelectGoogleFileAction, 
  unSelectBookingFileAction, 
  unSelectExpediaFileAction,
  saveGoogleFileAction,
  saveBookingFileAction,
  saveExpediaFileAction 
} from '../../redux/actions/FileActions.js';

import { createDictAction } from '../../redux/actions/DictionaryActions.js';

import { addTotalOrderAction, cleanTotalOrderAction  } from '../../redux/actions/TotalOrderActions.js';

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
    const { selectGoogleFileAction, unSelectGoogleFileAction } = this.props;
    //Clean redux state for google file
    unSelectGoogleFileAction();

    //Get the file input and store it in redux
    let fileGoogle = event.target.files[0]
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
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
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
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
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      selectExpediaFileAction(json)
    }
    reader.readAsText(fileExpedia)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({taxonomyItems}) => ({
      taxonomyItems: arrayMove(taxonomyItems, oldIndex, newIndex),
    }));
  };

  handleSliderChange = (event, minComments) => {
    this.setState({...this.state, minComments});
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
    const { createDictAction, saveGoogleFileAction, saveBookingFileAction, saveExpediaFileAction } = this.props;

    if( (this.props.fileGoogle.Hoteles !== undefined) && (this.props.fileBooking.Hoteles !== undefined) && (this.props.fileExpedia.Hoteles !== undefined)){
      //Get googleFile from redux, apply sort and filters
      let sorted = this.props.fileGoogle.Hoteles.sort(compare);
      let googleHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let googleFileToSave= {
        "Hoteles": googleHotels 
      }
      //Save sorted file in redux
      saveGoogleFileAction(googleFileToSave)


      //Get bookingFile from redux and sort it
      sorted = this.props.fileBooking.Hoteles.sort(compare);
      let bookingHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let bookingFileToSave = {
        "Hoteles": bookingHotels 
      }
      //Save sorted file in redux
      saveBookingFileAction(bookingFileToSave)


      //Get expediaFile from redux and sort it
      sorted = this.props.fileExpedia.Hoteles.sort(compare);
      let expediaHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let expediaFileToSave = {
        "Hoteles": expediaHotels 
      }
      //Save sorted file in redux
      saveExpediaFileAction(expediaFileToSave)


      //Create taxonomy array
      let taxonomyArray = this.constructTaxonomyArray(this.state.taxonomyItems);

      //Create dictionary
      let dictionary = createDictionary(googleFileToSave, bookingFileToSave, expediaFileToSave);
      createDictAction(dictionary);

      //Generate confiability tuples
      let googleTuples = generateTuples(googleFileToSave, dictionary);
      let bookingTuples = generateTuples(bookingFileToSave, dictionary);
      let expediaTuples = generateTuples(expediaFileToSave, dictionary);

      //api call
      let postData =
        {
          "googleTuples": googleTuples,
          "bookingTuples": bookingTuples,
          "expediaTuples": expediaTuples,
          "taxonomy": taxonomyArray
        }
      
        this.getResultAsync(postData);
    }
  }

  getResultAsync = (postData) => {

    const { addTotalOrderAction } = this.props;

    let data = JSON.stringify(postData);
    let request = new Request('http://localhost:8080/multicontext');
    (async () => { 
      await fetch(request, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
      })
        .then((response) => response.json())
          .then((responseJson) => {
            //guardar en redux el resultado
            console.log(responseJson);
            addTotalOrderAction(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });

      })();
  
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
              handleSliderChange={this.handleSliderChange}
              sliderValue = {this.state.minComments}
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
  fileGoogleSaved: PropTypes.object,
  fileBookingSaved: PropTypes.object,
  fileExpediaSaved: PropTypes.object,
  hotelsDict: PropTypes.object,
  totalOrder: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogle: state.fileGoogle,
    fileBooking: state.fileBooking,
    fileExpedia: state.fileExpedia,
    hotelsDict: state.hotelsDict,
    fileGoogleSaved: state.fileGoogleSaved,
    fileBookingSaved: state.fileBookingSaved,
    fileExpediaSaved: state.fileExpediaSaved,
    totalOrder: state.totalOrder
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGoogleFileAction: (fileGoogle) => {dispatch(selectGoogleFileAction(fileGoogle));},
    saveGoogleFileAction: (fileGoogleSaved) => {dispatch(saveGoogleFileAction(fileGoogleSaved));},
    selectBookingFileAction: (fileBooking) => {dispatch(selectBookingFileAction(fileBooking));},
    saveBookingFileAction: (fileBookingSaved) => {dispatch(saveBookingFileAction(fileBookingSaved));},
    selectExpediaFileAction: (fileExpedia) => {dispatch(selectExpediaFileAction(fileExpedia));},
    saveExpediaFileAction: (fileExpediaSaved) => {dispatch(saveExpediaFileAction(fileExpediaSaved));},
    unSelectGoogleFileAction: () => {dispatch(unSelectGoogleFileAction());},
    createDictAction: (hotelsDict) => {dispatch(createDictAction(hotelsDict));},
    addTotalOrderAction: (totalOrder) => {dispatch(addTotalOrderAction(totalOrder));}
  }
}   

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
