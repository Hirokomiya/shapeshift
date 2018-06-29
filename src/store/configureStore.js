import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState} from '../localStorage/localStorage';
import transactionReducer from '../reducers/transactionsReducer';
import coinsReducer from '../reducers/coinsReducer';
import limitsReducer from '../reducers/limitsReducer';
import topCoinsReducer from '../reducers/topCoinsReducer';
import languageReducer from '../reducers/languageReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

export default () => {
    const store = createStore(
      combineReducers({
        transaction: transactionReducer,
        coins: coinsReducer,
        limits: limitsReducer,
        topCoins: topCoinsReducer,
        language: languageReducer
      }),
      persistedState,
      composeEnhancers(applyMiddleware(thunk))
    );

    store.subscribe(() => {
      saveState({
        topCoins: store.getState().topCoins
      });
    });

    return store;
  };