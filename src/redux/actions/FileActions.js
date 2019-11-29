  
import { GOOGLEFILE_SELECTED, GOOGLEFILE_CLEAN, GOOGLEFILE_SAVED, GOOGLEFILE_SAVED_CLEAN, BOOKINGFILE_SELECTED, BOOKINGFILE_CLEAN, BOOKINGFILE_SAVED, BOOKINGFILE_SAVED_CLEAN, TRIVAGOFILE_SELECTED, TRIVAGOFILE_CLEAN, TRIVAGOFILE_SAVED, TRIVAGOFILE_SAVED_CLEAN } from '../constants/fileConstants'

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

export const selectTrivagoFileAction = (fileTrivago) => {
    return {
        type: TRIVAGOFILE_SELECTED,
        payload: fileTrivago
    };
}

export const unSelectTrivagoFileAction = () => {
    return {
        type: TRIVAGOFILE_CLEAN
    };
}

export const saveTrivagoFileAction = (fileTrivago) => {
    return {
        type: TRIVAGOFILE_SAVED,
        payload: fileTrivago
    };
}

export const cleanSavedTrivagoFileAction = () => {
    return {
        type: TRIVAGOFILE_SAVED_CLEAN
    };
}