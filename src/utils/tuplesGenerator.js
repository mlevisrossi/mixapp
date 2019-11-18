

export const generateTuples = (sortedData, dictionary) => {
    let tuples = new Array();
    let newTuple;
    let hotelName1, hotelName2;
    let hotelId1, hotelId2;

    let hotels = sortedData.Hoteles
    
    for (var i=0; i<hotels.length; i++) {
        hotelName1 = hotels[i].name
        hotelId1 = dictionary[hotelName1]
        if(i+1 < hotels.length) {
            hotelName2= hotels[i+1].name
            hotelId2 = dictionary[hotelName2]
            newTuple = {h1: hotelId2, h2: hotelId1}
            tuples.push(newTuple)
        }
    }
    
    return tuples;
}