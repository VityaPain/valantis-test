import { combineReducers, configureStore } from "@reduxjs/toolkit"

import filtersReducer from './filterSlice'

const rootReducer = combineReducers({
    filters: filtersReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store