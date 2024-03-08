import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeTypeFilter: null,
    activeValueFilter: null,
    brands: []
}

export const slice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        setAllBrands(state, action) {
            state.brands = action.payload
        },
        setActiveTypeFilter(state, action) {
            state.activeTypeFilter = action.payload
        },
        setActiveValueFilter(state, action) {
            state.activeValueFilter = action.payload
        },
        clearFilter(state) {
            state.activeTypeFilter = null
            state.activeValueFilter = null
        }
    }
})

export const selectAllBrands = (state) => {
    return state.filters.brands
}

export const selectActiveTypeFilter = (state) => {
    return state.filters.activeTypeFilter
}

export const selectActiveValueFilter = (state) => {
    return state.filters.activeValueFilter
}

export const { setAllBrands, setActiveTypeFilter, setActiveValueFilter, clearFilter } = slice.actions

export default slice.reducer