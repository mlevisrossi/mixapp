import React from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Input from "@material-ui/core/Input";
import { Label } from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import GridContainer from "components/Grid/GridContainer.js";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SortableComponent from "components/SortableComponent/SortableComponent.js";
import arrayMove from 'array-move';

import Slider from '@material-ui/core/Slider';

import 'assets/css/views/settingsPage.css';

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFileGoogle:'Ningun archivo seleccionado',
            textFileBooking:'Ningun archivo seleccionado',
            textFileExpedia:'Ningun archivo seleccionado'
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

     getUploadedExpediaFileName = (e) => {
        const { handleExpediaFileChange } = this.props;
        
        let files = e.target.files,
            value = e.target.value,
            textFileExpedia;
        if( files && files.length > 1 ) 
            textFileExpedia = `${files.length} files selected`;
        else                            
            textFileExpedia = value.split( '\\' ).pop();
     
        if(textFileExpedia) 
            this.setState({...this.state,textFileExpedia});

        handleExpediaFileChange(e);
     }

    

    render() {
        return(
            <div>
            <form>

            <GridContainer justify="center" spacing={0} alignItems="flex-start" direction="row">
                
                <GridItem xs={4} alignItems="strech">

                    <div className='settings-title'>
                        <h2>Configuración</h2>
                    </div>

                    <div className='title-content'>
                        <h3>
                            Subir archivos
                            <br />
                        </h3>
                    </div>
                    <div>
                        <Button variant="contained" component="label" color="white" className='filebutton'>
                            Google 
                            <PublishIcon />
                            <input type="file" style={{ display: "none" }} onChange={this.getUploadedGoogleFileName}/>
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
                            <input type="file" style={{ display: "none" }} onChange={this.getUploadedBookingFileName}/>
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
                            Expedia 
                            <PublishIcon />
                            <input type="file" style={{ display: "none" }} onChange={this.getUploadedExpediaFileName}/>
                        </Button>
                        <TextField
                            id="standard-read-only-input3"
                            value= {this.state.textFileExpedia}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            className='filetextfield'
                        />
                    </div>

                    <div>
                        <br />
                        <Typography id="labelSlider" className='labelSlider' >Descartar hoteles con un minimo de comentarios </Typography>
                        <Slider
                            track="inverted"
                            defaultValue={0}
                            aria-labelledby="labelSlider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                            className='slider'
                        />
                    </div>

                </GridItem>

                <GridItem xs={4} alignItems="center">

                    <div className='settings-title'>
                        <h2>   </h2>
                    </div>
                    <div className='title-content'>
                    <h3>
                        <br />
                        Elegir taxonomia
                        <br />
                    </h3>
                    </div>
                    <div>
                        <SortableComponent items={this.props.taxonomyItems} onSortEnd={this.props.onSortEnd} />
                    </div>
                </GridItem>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={1} justify="center">
                    
                    <div alignItems="center">
                        <Button color="primary" onClick={this.props.handleSubmit}>
                            Aplicar
                        </Button>
                    </div>
                </GridItem>
            </GridContainer>
            </form>
            </div>
    );
    }
}