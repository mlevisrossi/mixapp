  
import { GOOGLEFILE_SELECTED, GOOGLEFILE_CLEAN, GOOGLEFILE_SAVED, GOOGLEFILE_SAVED_CLEAN, BOOKINGFILE_SELECTED, BOOKINGFILE_CLEAN, BOOKINGFILE_SAVED, BOOKINGFILE_SAVED_CLEAN, EXPEDIAFILE_SELECTED, EXPEDIAFILE_CLEAN, EXPEDIAFILE_SAVED, EXPEDIAFILE_SAVED_CLEAN } from '../constants/fileConstants'

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

export const saveGoogleFileAction = (fileGoogleSaved) => {
    return {
        type: GOOGLEFILE_SAVED,
        payload: fileGoogleSaved
    };
}

export const cleanSavedGoogleFileAction = () => {
    return {
        type: GOOGLEFILE_SAVED_CLEAN
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

export const saveBookingFileAction = (fileBookingSaved) => {
    return {
        type: BOOKINGFILE_SAVED,
        payload: fileBookingSaved
    };
}

export const cleanSavedBookingFileAction = () => {
    return {
        type: BOOKINGFILE_SAVED_CLEAN
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

export const saveExpediaFileAction = (fileExpedia) => {
    return {
        type: EXPEDIAFILE_SAVED,
        payload: fileExpedia
    };
}

export const cleanSavedExpediaFileAction = () => {
    return {
        type: EXPEDIAFILE_SAVED_CLEAN
    };
}