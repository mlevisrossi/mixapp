import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//css
import 'assets/css/views/settingsPage.css';

// core components
import SettingsForm from "views/SettingsPage/SettingsForm.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Notification from "components/Notification/Notification.js";
import Snackbar from '@material-ui/core/Snackbar';

import { compare, findMaxReviews } from "utils/fileUtils.js";
import { createDictionary } from "utils/dictionary.js";
import { generateTuples } from "utils/tuplesGenerator.js";
import arrayMove from 'array-move';

//Actions
import { 
  selectGoogleFileAction, 
  selectBookingFileAction, 
  selectTrivagoFileAction, 
  unSelectGoogleFileAction, 
  unSelectBookingFileAction, 
  unSelectTrivagoFileAction,
  saveGoogleFileAction,
  saveBookingFileAction,
  saveTrivagoFileAction,
  cleanSavedGoogleFileAction,
  cleanSavedBookingFileAction,
  cleanSavedTrivagoFileAction
} from '../../redux/actions/FileActions.js';
import { createDictAction, cleanDictAction } from '../../redux/actions/DictionaryActions.js';
import { addTotalOrderAction, cleanTotalOrderAction  } from '../../redux/actions/TotalOrderActions.js';
import { setMaxReviewsAction, cleanMaxReviewsAction  } from '../../redux/actions/MaxReviewsActions.js';
import { startLoadingAction, endLoadingAction  } from '../../redux/actions/LoadingActions.js';

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taxonomyItems: ['Google', 'Booking', 'Trivago'],
      minComments: 0,
      error: false,
      errorMessage: 'Error'
    }
  }

  setMaxReviews = (hotelsList) => {
    const { setMaxReviewsAction, cleanMaxReviewsAction } = this.props;
    let newMax = findMaxReviews(hotelsList, this.props.maxReviews);
    if(newMax != this.props.maxReviews){
      cleanMaxReviewsAction();
      setMaxReviewsAction(newMax);
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
      this.setMaxReviews(json.Hoteles)
    }
    reader.readAsText(fileGoogle)
  }

  handleBookingFileChange = (event) => {
    event.preventDefault()
    const { selectBookingFileAction, unSelectBookingFileAction } = this.props;
    //Clean redux state for booking file
    unSelectBookingFileAction();

    let fileBooking = event.target.files[0]
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      selectBookingFileAction(json)
      this.setMaxReviews(json.Hoteles)
    }
    reader.readAsText(fileBooking)
  }

  handleTrivagoFileChange = (event) => {
    event.preventDefault()
    const { selectTrivagoFileAction, unSelectTrivagoFileAction } = this.props;
    //Clean redux state for booking file
    unSelectTrivagoFileAction();

    let fileTrivago = event.target.files[0]
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      let json = JSON.parse(binaryStr)
      selectTrivagoFileAction(json)
      this.setMaxReviews(json.Hoteles)
    }
    reader.readAsText(fileTrivago)
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
    let trivagoIndex = taxonomyItems.indexOf('Trivago');
    taxonomyArray.push(trivagoIndex + 1);

    return taxonomyArray
  }

  cleanBeforeSubmit = () => {
    const { cleanSavedGoogleFileAction, cleanSavedBookingFileAction, cleanSavedTrivagoFileAction, cleanDictAction, cleanTotalOrderAction  } = this.props;
    //Clean saved files
    cleanSavedGoogleFileAction();
    cleanSavedBookingFileAction();
    cleanSavedTrivagoFileAction();

    //Clean dictionary
    cleanDictAction();

    //Clean total order
    cleanTotalOrderAction();
  }

  handleNulls = (hotelsList) => {
    hotelsList.map((hotel, i) => {
      if(hotel.rating == "null"){
        hotel.rating = 0;
      }
      if(hotel.reviews == "null"){
        hotel.reviews = 0;
      }
    });
  }
 
  handleSubmit = (event) => {
    const { createDictAction, saveGoogleFileAction, saveBookingFileAction, saveTrivagoFileAction } = this.props;

    //Clean the redux variables
    this.cleanBeforeSubmit();

    if( (this.props.fileGoogle.Hoteles !== undefined) && (this.props.fileBooking.Hoteles !== undefined) && (this.props.fileTrivago.Hoteles !== undefined)){
      //Get googleFile from redux, apply sort and filters

      //Handle null values
      this.handleNulls(this.props.fileGoogle.Hoteles);

      //Sort and filter hotels with min reviews
      let sorted = this.props.fileGoogle.Hoteles.sort(compare);
      let googleHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let googleFileToSave= {
        "Hoteles": googleHotels 
      }
      //Save sorted file in redux
      saveGoogleFileAction(googleFileToSave)

      //Get bookingFile from redux, apply sort and filters

      //Handle null values
      this.handleNulls(this.props.fileBooking.Hoteles);
      
      //Sort and filter hotels with min reviews
      sorted = this.props.fileBooking.Hoteles.sort(compare);
      let bookingHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let bookingFileToSave = {
        "Hoteles": bookingHotels 
      }
      //Save sorted file in redux
      saveBookingFileAction(bookingFileToSave)


      //Get trivagoFile from redux, apply sort and filters

      //Handle null values
      this.handleNulls(this.props.fileTrivago.Hoteles);

      //Sort and filter hotels with min reviews
      sorted = this.props.fileTrivago.Hoteles.sort(compare);
      let trivagoHotels = sorted.filter(hotel => hotel.reviews >= this.state.minComments);
      let trivagoFileToSave = {
        "Hoteles": trivagoHotels 
      }
      //Save sorted file in redux
      saveTrivagoFileAction(trivagoFileToSave)


      //Create taxonomy array
      let taxonomyArray = this.constructTaxonomyArray(this.state.taxonomyItems);

      //Create dictionary
      let dictionary = createDictionary(googleFileToSave, bookingFileToSave, trivagoFileToSave);
      createDictAction(dictionary);

      //Generate confiability tuples
      let googleTuples = generateTuples(googleFileToSave, dictionary);
      let bookingTuples = generateTuples(bookingFileToSave, dictionary);
      let trivagoTuples = generateTuples(trivagoFileToSave, dictionary);

      //api call
      let postData =
        {
          "googleTuples": googleTuples,
          "bookingTuples": bookingTuples,
          "trivagoTuples": trivagoTuples,
          "taxonomy": taxonomyArray
        }
      
        this.getResultAsync(postData);
    } else {
      this.showError("Por favor, ingrese un archivo para cada sitio.");
    }
  }

  getResultAsync = (postData) => {

    const { addTotalOrderAction, startLoadingAction, endLoadingAction } = this.props;
    startLoadingAction();

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
        .then((response) => {
          if(response.ok){
           response.json()
           .then((responseJson) => {
            //guardar en redux el resultado
            addTotalOrderAction(responseJson);
            endLoadingAction();
          })
          } else {
              this.showError("Se ha producido un error en el servidor.");
              endLoadingAction();
          }
        })
        .catch((error) => {
          this.showError("Se ha producido un error en el servidor.");
          endLoadingAction();
        });
      })();
  
  }

  handleClean = (event) => {
    const { unSelectGoogleFileAction, unSelectBookingFileAction, unSelectTrivagoFileAction, cleanMaxReviewsAction } = this.props;

    //clean selected files
    unSelectGoogleFileAction();
    unSelectBookingFileAction();
    unSelectTrivagoFileAction();

    //clean max reviews
    cleanMaxReviewsAction();

    //set parameters to the inicial values
    let newState = {
      minComments: 0,
      taxonomyItems: ['Google', 'Booking', 'Trivago']
    }
    this.setState(newState);
    //clean 
    this.cleanBeforeSubmit(); 

  }

  handleClose = (event) => {
    this.setState({...this.state, error: false});
  }

  handleCloseLoading = (event) => {
    this.setState({...this.state, loading: false});
  }

  showError = (message) => {
    let newState = {
      error: true,
      errorMessage: message
    }
    this.setState(newState);
  }

  showLoading = () => {
    this.setState({...this.state, loading: true});
  }

  render() {
    return (
        <div className='settings-sections'>
          <GridContainer alignItems="flex-start" justify="center">
              <GridItem xs={7}>
                <h2>Configuración</h2>
              </GridItem>
          </GridContainer>
          <SettingsForm 
            handleGoogleFileChange={this.handleGoogleFileChange} 
            handleBookingFileChange={this.handleBookingFileChange} 
            handleTrivagoFileChange={this.handleTrivagoFileChange} 
            handleSubmit={this.handleSubmit}
            handleClean={this.handleClean}
            taxonomyItems={this.state.taxonomyItems}
            onSortEnd={this.onSortEnd}
            handleSliderChange={this.handleSliderChange}
            sliderValue = {this.state.minComments}
            sliderMax = {this.props.maxReviews.max}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.error}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <Notification
              onClose={this.handleClose}
              variant="error"
              message={this.state.errorMessage}
            />
          </Snackbar>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.loading}
            autoHideDuration={5000}
            onClose={this.handleCloseLoading}
          >
            <Notification
              onClose={this.handleCloseLoading}
              variant="success"
              message="Calculando los rankings.."
            />
          </Snackbar>

        </div>
    );
  }
}

SettingsPage.propTypes = {
  fileGoogle: PropTypes.object,
  fileBooking: PropTypes.object,
  fileTrivago: PropTypes.object,
  fileGoogleSaved: PropTypes.object,
  fileBookingSaved: PropTypes.object,
  fileTrivagoSaved: PropTypes.object,
  hotelsDict: PropTypes.object,
  totalOrder: PropTypes.object,
  maxReviews: PropTypes.object,
  loading: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    fileGoogle: state.fileGoogle,
    fileBooking: state.fileBooking,
    fileTrivago: state.fileTrivago,
    hotelsDict: state.hotelsDict,
    fileGoogleSaved: state.fileGoogleSaved,
    fileBookingSaved: state.fileBookingSaved,
    fileTrivagoSaved: state.fileTrivagoSaved,
    totalOrder: state.totalOrder,
    maxReviews: state.maxReviews,
    loading: state.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGoogleFileAction: (fileGoogle) => {dispatch(selectGoogleFileAction(fileGoogle));},
    saveGoogleFileAction: (fileGoogleSaved) => {dispatch(saveGoogleFileAction(fileGoogleSaved));},
    selectBookingFileAction: (fileBooking) => {dispatch(selectBookingFileAction(fileBooking));},
    saveBookingFileAction: (fileBookingSaved) => {dispatch(saveBookingFileAction(fileBookingSaved));},
    selectTrivagoFileAction: (fileTrivago) => {dispatch(selectTrivagoFileAction(fileTrivago));},
    saveTrivagoFileAction: (fileTrivagoSaved) => {dispatch(saveTrivagoFileAction(fileTrivagoSaved));},
    unSelectGoogleFileAction: () => {dispatch(unSelectGoogleFileAction());},
    unSelectBookingFileAction: () => {dispatch(unSelectBookingFileAction());},
    unSelectTrivagoFileAction: () => {dispatch(unSelectTrivagoFileAction());},
    createDictAction: (hotelsDict) => {dispatch(createDictAction(hotelsDict));},
    addTotalOrderAction: (totalOrder) => {dispatch(addTotalOrderAction(totalOrder));},
    cleanSavedGoogleFileAction: () => {dispatch(cleanSavedGoogleFileAction());},
    cleanSavedBookingFileAction: () => {dispatch(cleanSavedBookingFileAction());},
    cleanSavedTrivagoFileAction: () => {dispatch(cleanSavedTrivagoFileAction());},
    cleanDictAction: () => {dispatch(cleanDictAction());},
    cleanTotalOrderAction: () => {dispatch(cleanTotalOrderAction());},
    setMaxReviewsAction: (maxReviews) => {dispatch(setMaxReviewsAction(maxReviews));},
    cleanMaxReviewsAction: () => {dispatch(cleanMaxReviewsAction());},
    startLoadingAction: () => {dispatch(startLoadingAction());},
    endLoadingAction: () => {dispatch(endLoadingAction());}
  }
}   

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
