
const betterThan = (H1, H2) => {
    let ratingH1 = parseFloat(H1.rating);
    let ratingH2 = parseFloat(H2.rating);

    let reviewsH1 = parseInt(H1.reviews);
    let reviewsH2 = parseInt(H2.reviews);

    let priceH1 = parseFloat(H1.price);
    let priceH2 = parseFloat(H2.price);

    let isBetter= false

    if( (H1.rating!=null && H2.rating==null) || (H1.rating!=null && H2.rating!=null && parseFloat(H1.rating)>parseFloat(H2.rating)))
    
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

const betterThan2 = (H1, H2) => {
  let isBetter= false

  if(H1.rating!=null && H2.rating==null) {
    isBetter = true;
  } else {
    if((H1.rating!=null && H2.rating!=null) && (parseFloat(H1.rating)>parseFloat(H2.rating)) ){
      isBetter = true;
    } else {
      if((H1.rating!=null && H2.rating!=null) && (parseFloat(H1.rating)===parseFloat(H2.rating)) && (H1.reviews!=null && H2.reviews==null)){
        isBetter = true;
      } else{
        if((H1.rating!=null && H2.rating!=null) && (parseFloat(H1.rating)===parseFloat(H2.rating)) && (H1.reviews!=null && H2.reviews!=null) && (parseInt(H1.reviews)>parseInt(H2.reviews))){
          isBetter=true;
        } else {
          if((H1.rating!=null && H2.rating!=null) && (parseFloat(H1.rating)===parseFloat(H2.rating)) && (H1.reviews!=null && H2.reviews!=null) && (parseInt(H1.reviews)===parseInt(H2.reviews)) && (H1.price!=null && H2.price==null)){
            isBetter= true;
          } else {
            if((H1.rating!=null && H2.rating!=null) && (parseFloat(H1.rating)===parseFloat(H2.rating)) && (H1.reviews!=null && H2.reviews!=null) && (parseInt(H1.reviews)===parseInt(H2.reviews)) && (H1.price!=null && H2.price!=null) && (parseFloat(H1.price) < parseFloat(H2.price))){
              isBetter=true;
            }
          }
        }

      }

    }

  }
  return isBetter;
}

const areEquals = (H1, H2) => {
  if(H1.rating!= null && H2.rating!=null && H1.reviews!=null && H2.reviews!=null && H1.price!=null && H2.price!=null){
    let ratingH1 = parseFloat(H1.rating);
    let ratingH2 = parseFloat(H2.rating);

    let reviewsH1 = parseInt(H1.reviews);
    let reviewsH2 = parseInt(H2.reviews);

    let priceH1 = parseFloat(H1.price);
    let priceH2 = parseFloat(H2.price);
    return ratingH1 === ratingH2 && reviewsH1 === reviewsH2 && priceH1 === priceH2;
  } else {
    return H1.rating== null && H2.rating==null && H1.reviews==null && H2.reviews==null && H1.price==null && H2.price==null;
  }
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