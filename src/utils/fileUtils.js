
const betterThan = (H1, H2) => {
    let ratingH1 = parseFloat(H1.rating);
    let ratingH2 = parseFloat(H2.rating);

    let reviewsH1 = parseInt(H1.reviews);
    let reviewsH2 = parseInt(H2.reviews);

    let isBetter= false
    
    if(ratingH1 > ratingH2){
        isBetter = true;
    } else {
        if(ratingH1 === ratingH2 && reviewsH1 > reviewsH2){
            isBetter = true;
        } else {
          if(ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && H1.price!="null" && H2.price=="null"){
            isBetter= true
          } else {
            if(ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && H1.price!="null" && H2.price!="null" && parseFloat(H1.price)<parseFloat(H2.price)){
              isBetter= true
            }
          }
        }
    }
    return isBetter;
}

const areEquals = (H1, H2) => {
    let ratingH1 = parseFloat(H1.rating);
    let ratingH2 = parseFloat(H2.rating);

    let reviewsH1 = parseInt(H1.reviews);
    let reviewsH2 = parseInt(H2.reviews);

    return ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && H1.price === H2.price;
}

export const compare = (a, b) => {
  if(areEquals(a, b)) {
    return 0;
  } else {
    if(betterThan(a, b)){
      return -1;
    } else {
      return 1;
    }
  }
}

export const findMaxReviews = (hotelsList, maxReviews) => {
  let hotelReviews;
  let newMax;
  if(JSON.stringify(maxReviews) === '{}'){
    newMax = 0;
  } else {
    newMax = maxReviews.max;
  }

  hotelsList.forEach(function (hotel) {
    hotelReviews = hotel.reviews;
    if(hotelReviews!="null" && parseInt(hotelReviews) > newMax){
      newMax = parseInt(hotelReviews);
    }
  });

  return newMax;
}