import { googleFileReducer } from './googleFileReducer';
import { googleFileSavedReducer } from './googleFileSavedReducer';
import { bookingFileReducer } from './bookingFileReducer';
import { bookingFileSavedReducer } from './bookingFileSavedReducer';
import { expediaFileReducer } from './expediaFileReducer';
import { expediaFileSavedReducer } from './expediaFileSavedReducer';

export const reducerFiles = {
    fileGoogle: googleFileReducer,
    fileBooking: bookingFileReducer,
    fileExpedia: expediaFileReducer,
    fileGoogleSaved: googleFileSavedReducer,
    fileBookingSaved: bookingFileSavedReducer,
    fileExpediaSaved: expediaFileSavedReducer
};
