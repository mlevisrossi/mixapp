import { googleFileReducer } from './googleFileReducer';
import { googleFileSavedReducer } from './googleFileSavedReducer';
import { bookingFileReducer } from './bookingFileReducer';
import { bookingFileSavedReducer } from './bookingFileSavedReducer';
import { trivagoFileReducer } from './trivagoFileReducer';
import { trivagoFileSavedReducer } from './trivagoFileSavedReducer';

export const reducerFiles = {
    fileGoogle: googleFileReducer,
    fileBooking: bookingFileReducer,
    fileTrivago: trivagoFileReducer,
    fileGoogleSaved: googleFileSavedReducer,
    fileBookingSaved: bookingFileSavedReducer,
    fileTrivagoSaved: trivagoFileSavedReducer
};
