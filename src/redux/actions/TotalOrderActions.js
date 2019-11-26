import { TOTALORDER_ADD, TOTALORDER_CLEAN } from '../constants/totalOrderConstants'

export const addTotalOrderAction = (totalOrder) => {
    return {
        type: TOTALORDER_ADD,
        payload: totalOrder
    };
}

export const cleanTotalOrderAction = () => {
    return {
        type: TOTALORDER_CLEAN
    };
}