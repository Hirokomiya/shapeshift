export default (state = {} , actions) => {
    switch(actions.type) {
        case 'SET_LIMITS':
          return actions.limits;
        default:
          return state;
    }
}