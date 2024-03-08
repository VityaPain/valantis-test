import { UseDispatch, useDispatch } from "react-redux"

import useServer from "./useServer"
import { setAllBrands } from "../components/redux/filterSlice"

const useDataProvider = () => {
    const dispatch = useDispatch()
    const { getAllBrands } = useServer()

    const getSessionBrands = () => {
        getAllBrands().then(data => {
            dispatch(setAllBrands(data))
        })
    }

    return { getSessionBrands }
}

export { useDataProvider }