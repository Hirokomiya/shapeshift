export default (state = [], actions) => {
    switch(actions.type) {
        case 'SET_TOP_COINS':
          return actions.coins.map(({short, perc, price}) => {
              return {
                short,
                perc,
                price
              }
          })
        default:
          return state;
    }
}