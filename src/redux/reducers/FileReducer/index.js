import { googleFileReducer } from './googleFileReducer';
import { bookingFileReducer } from './bookingFileReducer';
import { expediaFileReducer } from './expediaFileReducer';

export const reducerFiles = {
    fileGoogle: googleFileReducer,
    fileBooking: bookingFileReducer,
    fileExpedia: expediaFileReducer
};
