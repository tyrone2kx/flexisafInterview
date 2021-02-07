import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import siteReducer from '../reducers/site';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('flexisafState', serializedState)
    } catch(e) {
        console.log(e);
    }
}


function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('flexisafState');
        if (serializedState === null) {
            return undefined;
        }
        else {
            return JSON.parse(serializedState)
        }
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

const configureStore = () => {

    // STORE CREATION (with multiple reducers)

    const store = createStore(
        combineReducers({
            site: siteReducer,
        }),
        persistedState,
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
        
    store.subscribe(() => saveToLocalStorage(store.getState()));
    
        return store;
};

// thunk allows redux to dispatch functions
export default configureStore;