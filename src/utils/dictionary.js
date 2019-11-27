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

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

export const mapToHotelNames = (hotelsDict, totalOrder) => {
    let hotelsOrder = new Array();
    let hotelName;
    totalOrder.forEach(function (id) {
        hotelName = getKeyByValue(hotelsDict, id);
        hotelsOrder.push({
            "name": hotelName
        });
    });

    return hotelsOrder;
}