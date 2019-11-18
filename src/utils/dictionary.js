const { fromJS  } = require('immutable');

export const createDictionary = (dataGoogle, dataBooking, dataExpedia) => {
    let id = 1;

    // Dictionary to store pairs key-value for hotels
    // Key represents hotels names and value hotels ids
    let hotelsDict = new Object();

    // Insert pairs in the dictionary from the hotel files
    id = getData(dataGoogle, hotelsDict, id);
    id = getData(dataBooking, hotelsDict, id);
    id = getData(dataExpedia, hotelsDict, id);

    return hotelsDict;
}

const getData = (data, hotelsDict, id) => {
    let isExist
    data.Hoteles.forEach(function (hotel) {
        isExist = hotel.name in hotelsDict
        if(!isExist){     //if hotel name is not in the dict
            hotelsDict[hotel.name] = id;
            id++; 
        }
    });

    return id;
}