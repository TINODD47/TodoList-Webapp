import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer.js';

// define any additional middleware 
const middleware= (getDefaultMiddleware)=>
    process.env.NODE_ENV ==='development'
        ?[...getDefaultMiddleware(),logger]
        :[...getDefaultMiddleware()];
        // configure the redux store

const store=configureStore({
    reducer:rootReducer,
    middleware:middleware,
    devTools:process.env.NODE_ENV!=='production',
    // Enable redux devtools in extension
})

export default store;