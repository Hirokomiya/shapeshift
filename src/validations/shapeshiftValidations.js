//check if empty string
export const validateInput = (value1, value2) => {
    return !!value1 && !!value2;
}

export const validateAmount = (amount, max, min) => {
    if(isNaN(amount) || !amount) return false;
    if(isNaN(max) || !max) return false;
    if(isNaN(min) || !min) return false;
    return amount <= max && amount >= min;
}
