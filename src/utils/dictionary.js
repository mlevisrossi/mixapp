export const createDictionary = (dataGoogle, dataBooking, dataTrivago) => {
    let id = 1;

    // Dictionary to store pairs key-value for hotels
    // Key represents hotels names and value hotels ids
    let hotelsDict = new Object();

    // Insert pairs in the dictionary from the hotel files
    id = getData(dataGoogle, hotelsDict, id);
    id = getData(dataBooking, hotelsDict, id);
    id = getData(dataTrivago, hotelsDict, id);

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

export const mapToHotelNames = (hotelsDict, totalOrder, google, booking, trivago) => {
    let hotelsOrder = new Array();
    let hotelName, id;
    totalOrder.forEach(function (elem) {
        //Get the hotel name from the dictionary
        id = elem.id
        hotelName = getKeyByValue(hotelsDict, id);

        let totalReviews = 0;
        let bestPrice = Number.MAX_SAFE_INTEGER;
        let bestPriceSite = "";

        //Check if the hotel was in google
        let hotelInGoogle = google.find(hotel => hotel.name === hotelName);
        if(hotelInGoogle!= undefined){
            totalReviews += parseInt(hotelInGoogle.reviews);
            if (hotelInGoogle.price!= null && parseFloat(hotelInGoogle.price) < bestPrice){
                bestPrice = parseFloat(hotelInGoogle.price);
                bestPriceSite = "Google";
            }
        }

        //Check if the hotel was in booking
        let hotelInBooking = booking.find(hotel => hotel.name === hotelName);
        if(hotelInBooking!= undefined){
            totalReviews += parseInt(hotelInBooking.reviews);
            if (hotelInBooking.price!= null && parseFloat(hotelInBooking.price)< bestPrice){
                bestPrice = parseFloat(hotelInBooking.price);
                bestPriceSite = "Booking";
            }
        }

        //Check if the hotel was in trivago
        let hotelInTrivago = trivago.find(hotel => hotel.name === hotelName);
        if(hotelInTrivago!= undefined){
            totalReviews += parseInt(hotelInTrivago.reviews);
            if (hotelInTrivago.price!= null && parseFloat(hotelInTrivago.price)< bestPrice){
                bestPrice = parseFloat(hotelInTrivago.price);
                bestPriceSite = "Trivago";
            }
        }

        if(bestPrice == Number.MAX_SAFE_INTEGER){
            bestPrice = null;
        }
        
        //Add the hotel with the data to total order
        hotelsOrder.push({
            "name": hotelName,
            "pos": elem.pos,
            "reviews": totalReviews,
            "bestPrice": bestPrice,
            "bestPriceSite": bestPriceSite,
            "sites": {
                "google": hotelInGoogle!= undefined,
                "booking": hotelInBooking!= undefined,
                "trivago": hotelInTrivago!= undefined
            }
        });
        
    });

    return hotelsOrder;
}