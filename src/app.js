import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Loading from './components/Loading';
import AppRouter from './appRouter/AppRouter';
import {startSetCoins, addMarketCap} from './actions/coins';
import {startSetTopCoins} from './actions/topCoins';
import 'normalize-css/normalize';
import './styles/styles.scss';

const store = configureStore();
let rendered = false;
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<Loading />, document.getElementById('root'));

store.dispatch(startSetCoins(() => {
    store.dispatch(startSetTopCoins((response) => {
        response.forEach((coin) => {
            store.dispatch(addMarketCap(coin.short, coin.mktcap));
        });
        ReactDOM.render(jsx, document.getElementById('root'));
        rendered = true;
    }));
}));

store.subscribe(() => {
    if(!rendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        rendered = true;
    }
});
