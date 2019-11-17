
const betterThan = (H1, H2) => {
    let ratingH1 = parseFloat(H1.rating);
    let ratingH2 = parseFloat(H2.rating);

    let reviewsH1 = parseInt(H1.reviews);
    let reviewsH2 = parseInt(H2.reviews);

    let priceH1 = parseFloat(H1.price);
    let priceH2 = parseFloat(H2.price);

    let isBetter= false
    if(ratingH1 > ratingH2){
        isBetter = true;
    } else {
        if(ratingH1 === ratingH2 && reviewsH1 > reviewsH2){
            isBetter = true;
        } else {
            if(ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && priceH1 < priceH2 ){
                isBetter= true
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

    let priceH1 = parseFloat(H1.price);
    let priceH2 = parseFloat(H2.price);
    return ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && priceH1 === priceH2;
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