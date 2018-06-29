export default (address) => {
    const destTag = address.match(/\d+$/g);
    return destTag;
}
