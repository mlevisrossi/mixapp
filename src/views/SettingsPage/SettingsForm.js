import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import GridContainer from "components/Grid/GridContainer.js";
import Typography from '@material-ui/core/Typography';
import SortableComponent from "components/SortableComponent/SortableComponent.js";
import Slider from '@material-ui/core/Slider';

import 'assets/css/views/settingsPage.css';

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFileGoogle:'Ningún archivo seleccionado',
            textFileBooking:'Ningún archivo seleccionado',
            textFileTrivago:'Ningún archivo seleccionado'
        };
    }

    getUploadedGoogleFileName = (e) => {
        const { handleGoogleFileChange } = this.props;
        let files = e.target.files,
            value = e.target.value,
            textFileGoogle;
        if( files && files.length > 1 ) 
            textFileGoogle = `${files.length} files selected`;
        else                            
            textFileGoogle = value.split( '\\' ).pop();
     
        if(textFileGoogle) 
            this.setState({...this.state,textFileGoogle});

        handleGoogleFileChange(e);
        
    }

    getUploadedBookingFileName = (e) => {
        const { handleBookingFileChange } = this.props;
        
        let files = e.target.files,
            value = e.target.value,
            textFileBooking;
        if( files && files.length > 1 ) 
            textFileBooking = `${files.length} files selected`;
        else                            
            textFileBooking = value.split( '\\' ).pop();
     
        if(textFileBooking) 
            this.setState({...this.state,textFileBooking});

        handleBookingFileChange(e);
    }

    getUploadedTrivagoFileName = (e) => {
        const { handleTrivagoFileChange } = this.props;
        
        let files = e.target.files,
            value = e.target.value,
            textFileTrivago;
        if( files && files.length > 1 ) 
            textFileTrivago = `${files.length} files selected`;
        else                            
            textFileTrivago = value.split( '\\' ).pop();
     
        if(textFileTrivago) 
            this.setState({...this.state,textFileTrivago});

        handleTrivagoFileChange(e);
    }

    clean = (e) => {
        let newState = { 
            textFileGoogle: 'Ningún archivo seleccionado',
            textFileBooking: 'Ningún archivo seleccionado',
            textFileTrivago: 'Ningún archivo seleccionado',
        }
        this.setState(newState);

        this.props.handleClean(e);
    }

    onInputClick = (event) => {
        event.target.value = '';
    }

    

    render() {
        return(
            <div>
            <form>
            <GridContainer justify="center" spacing={0} alignItems="flex-start" direction="row">
                <GridItem xs={4}>
                    <div className='title-content'>
                        <h3>
                            Archivos de datos
                            <br />
                        </h3>
                    </div>
                    <div>
                        <Button variant="contained" component="label" color="white" className='filebutton'>
                            Google 
                            <PublishIcon />
                            <input type="file" accept="text/plain, application/json" style={{ display: "none" }} onChange={this.getUploadedGoogleFileName} onClick={this.onInputClick}/>
                        </Button>
                        <TextField
                            id="standard-read-only-input1"
                            value= {this.state.textFileGoogle}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            className='filetextfield'
                        />
                    </div>
                    <div>
                        <Button variant="contained" component="label" color="white" className='filebutton' >
                            Booking 
                            <PublishIcon />
                            <input type="file" accept="text/plain, application/json" style={{ display: "none" }} onChange={this.getUploadedBookingFileName} onClick={this.onInputClick}/>
                        </Button>
                        <TextField
                            id="standard-read-only-input2"
                            value= {this.state.textFileBooking}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            className='filetextfield'
                        />
                    </div>

                    <div>
                        <Button variant="contained" component="label" color="white" className='filebutton'>
                            Trivago 
                            <PublishIcon />
                            <input type="file" accept="text/plain, application/json" style={{ display: "none" }} onChange={this.getUploadedTrivagoFileName} onClick={this.onInputClick}/>
                        </Button>
                        <TextField
                            id="standard-read-only-input3"
                            value= {this.state.textFileTrivago}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            className='filetextfield'
                        />
                    </div>

                    <div>
                        <br />
                        <div className='title-content'>
                            <h4>
                                Descartar hoteles con un mínimo de reseñas
                                <br />
                            </h4>
                        </div>
                        <Slider
                            track="inverted"
                            value={this.props.sliderValue}
                            onChange={this.props.handleSliderChange}
                            aria-labelledby="labelSlider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={this.props.sliderMax}
                            className='slider'
                        />
                    </div>

                </GridItem>

                <GridItem xs={3}>
                    <div className='title-content'>
                    <h3>
                        Orden de Preferencia
                        <br />
                    </h3>
                    </div>
                    <div>
                        <SortableComponent items={this.props.taxonomyItems} onSortEnd={this.props.onSortEnd} />
                    </div>
                </GridItem>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={1} >
                        <Button className='applyButton' onClick={this.props.handleSubmit}>
                            Aplicar
                        </Button>
                </GridItem>
                <GridItem xs={1} >
                        <Button className='applyButton' onClick={this.clean}>
                            Limpiar
                        </Button>
                </GridItem>
            </GridContainer>
            </form>
            </div>
    );
    }
}