import {combineReducers} from 'redux';
import authReducer from './authReducer'
import Reducer from './Reducer'
import listingReducer from './listingReducer'

const rootReducer = 
combineReducers({
    authReducer: authReducer,
    reducer: Reducer,
    listingReducer: listingReducer
})

export default rootReducer;
