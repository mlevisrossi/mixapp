  
import { GOOGLEFILE_SELECTED, GOOGLEFILE_CLEAN, BOOKINGFILE_SELECTED, BOOKINGFILE_CLEAN, EXPEDIAFILE_SELECTED, EXPEDIAFILE_CLEAN } from '../constants/fileConstants'

export const selectGoogleFileAction = (fileGoogle) => {
    return {
        type: GOOGLEFILE_SELECTED,
        payload: fileGoogle
    };
}

export const unSelectGoogleFileAction = () => {
    return {
        type: GOOGLEFILE_CLEAN
    };
}

export const selectBookingFileAction = (fileBooking) => {
    return {
        type: BOOKINGFILE_SELECTED,
        payload: fileBooking
    };
}

export const unSelectBookingFileAction = () => {
    return {
        type: BOOKINGFILE_CLEAN
    };
}

export const selectExpediaFileAction = (fileExpedia) => {
    return {
        type: EXPEDIAFILE_SELECTED,
        payload: fileExpedia
    };
}

export const unSelectExpediaFileAction = () => {
    return {
        type: EXPEDIAFILE_CLEAN
    };
}