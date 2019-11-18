import { DICT_CREATE, DICT_CLEAN } from '../constants/dictConstants'

export const createDictAction = (hotelsDict) => {
    return {
        type: DICT_CREATE,
        payload: hotelsDict
    };
}

export const cleanDictAction = () => {
    return {
        type: DICT_CLEAN
    };
}