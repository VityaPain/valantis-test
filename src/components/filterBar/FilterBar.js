import { useSelector, useDispatch } from "react-redux"

import BrandFilter from "./brandFilter/BrandFilter"
import FilterWithInput from "./filterWithInput/FilterWithInput"

import { 
    selectActiveTypeFilter, 
    setActiveTypeFilter as setType,
    clearFilter
} from "../redux/filterSlice"

import './filterBar.scss'

const FilterBar = () => {
    const activeTypeFilter = useSelector(selectActiveTypeFilter)
    const dispatch = useDispatch()

    const setActiveTypeFilter = (type) => {
        if (type === activeTypeFilter) {
            dispatch(clearFilter())
        } else {
            dispatch(setType(type))
        }
    }

    return (
        <div className="filters">
            <div className="filters-top">
                <div className="filters-top__title">Фильтры</div>
                <div 
                    className="filters-top__reset"
                    onClick={() => dispatch(clearFilter())}
                >
                    сбросить все
                </div>
            </div>
            <FilterWithInput 
                type="product"
                isExpanded={activeTypeFilter === 'product'}
                setActiveTypeFilter={setActiveTypeFilter}
            />
            <FilterWithInput 
                type="price"
                isExpanded={activeTypeFilter === 'price'}
                setActiveTypeFilter={setActiveTypeFilter}
            />
            <BrandFilter 
                isExpanded={activeTypeFilter === 'brand'}
                setActiveTypeFilter={setActiveTypeFilter}
            />
        </div>
    )
}

export default FilterBar