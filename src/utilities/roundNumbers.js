const addColons = (num) => {
    let str = num.toFixed(3);
    const match = str.match(/\.\d+$/);
    let endPoint = '';
    let n = 3;
  
    if(match) {
        endPoint = match[0] === '.000' ? '' : match[0];
      str = str.substr(0, match.index);
    }
    
    while(str.length > n) {
      const index = str.length - n;
        str = str.substr(0,index) + ',' + str.substr(index);
        n = n + 4;
    }
    
    return str + endPoint;
  }

//round numbers to 3 decimal points
export const roundPrice = (price) => {
    if(price) {
        return addColons(price);
    }
    return '0';
}

//round numbers to millions
export const roundCap = (cap = 0) => {
    let num = Math.round(cap/1000000)
    if(num > 1) {
        num = addColons(Math.round(num));
    }
    else {
        num = roundPrice(num);
    }
    return num;
}

