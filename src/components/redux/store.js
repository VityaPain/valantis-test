import { combineReducers, configureStore } from "@reduxjs/toolkit"

import filtersReducer from './filterSlice'
import paginationReducer from './pagintaionSlice'

const rootReducer = combineReducers({
    filters: filtersReducer,
    pagination: paginationReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store