import React from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Input from "@material-ui/core/Input";
import { Label } from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FilePond } from 'react-filepond';

import FileInput from "components/FileInput/FileInput";

export default function SettingsForm(props) {
    return(
        <GridItem xs={12} sm={12} md={6} >
            <h3>Seleccionar archivos</h3>
            <FormControl component="fieldset" onSubmit={props.handleSubmit}>
                <FormGroup aria-label="position" row>
                    
                    <FormControlLabel
                        control={<Input name="filegoogle" type="file" onChange={props.handleGoogleFileChange}/>}
                        label="Archivo Google "
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Input name="filebooking" type="file" onChange={props.handleBookingFileChange} />}
                        label="Archivo Booking "
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Input name="fileexpedia" type="file" onChange={props.handleExpediaFileChange} />}
                        label="Archivo Expedia "
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Descartar hoteles"
                        labelPlacement="start"
                    />

                    <input type="submit" value="Submit" />
                </FormGroup>
            </FormControl>
        </GridItem>
    );
}