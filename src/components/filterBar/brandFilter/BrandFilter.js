import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { clsx } from "clsx"
import { selectAllBrands, selectActiveValueFilter, setActiveValueFilter } from "../../redux/filterSlice"
import { useDataProvider } from "../../../hooks/SessionDataHandler"

const BrandFilter = ({isExpanded, setActiveTypeFilter}) => {
    const { getSessionBrands } = useDataProvider()
    const dispatch = useDispatch()

    const brands = useSelector(selectAllBrands)
    const activeBrand = useSelector(selectActiveValueFilter)

    useEffect(() => {
        getSessionBrands()
    }, [])

    const renderBrandList = (arr) => {
        const handleClick = (name) => {
            dispatch(setActiveValueFilter(name))
        }

        const res = arr.map((brand, i) => {
            return (
                <li 
                    key={i}
                    className={clsx(
                        'brands-list__item', 
                        activeBrand === brand && 'active'
                    )}
                    onClick={() => handleClick(brand)}
                >
                    {brand}
                </li>
            )
        })

        return (
            <ul className="brands-list">{res}</ul>
        )
    }

    const brandsList = renderBrandList(brands)

    return (
        <div className="filters__section brands">
            <div 
                className={clsx('brands__title', isExpanded && 'active')}
                onClick={() => setActiveTypeFilter('brand')}
            >
                Бренды
            </div>
            {isExpanded && brandsList}
        </div>
    )
}

export default BrandFilter