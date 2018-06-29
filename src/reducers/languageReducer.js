export default (state = {}, actions) => {
    switch(actions.type) {
        case 'CHANGE_LANG':
          return actions.lang;
        default: 
          return state;
    }
}