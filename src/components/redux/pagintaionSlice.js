import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1
}

export const slice = createSlice({
    name: 'pagination',
    initialState: initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
    }
})

export const selectCurrentPage = (state) => {
    return state.pagination.currentPage
}


export const { setCurrentPage } = slice.actions

export default slice.reducer