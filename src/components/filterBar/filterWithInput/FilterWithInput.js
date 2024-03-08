import { useRef, useCallback } from "react"
import { useDispatch } from "react-redux"

import { clsx } from "clsx"
import { setActiveValueFilter } from "../../redux/filterSlice"
import searchBtn from '../../../static/img/search-btn.svg'

const FilterWithInput = ({isExpanded, type, setActiveTypeFilter}) => {
    const dispatch = useDispatch()
    const inputRef = useRef()

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(setActiveValueFilter(type === 'price' ? parseInt(inputRef.current) : inputRef.current))
    }, [inputRef.current])

    const handleInput = (e) => {
        inputRef.current = e.target.value
    }

    return (
        <form
            className={`filters__section ${type}`}
            onSubmit={e => handleSubmit(e)}
        >
            <label 
                onClick={() => setActiveTypeFilter(type)}
                className={clsx('price__title', isExpanded && 'active')}
            >
                {type === 'price' ? 'Цена' : 'Название'}
            </label>
            {
                isExpanded && (
                    <>
                        <input 
                            name={type}
                            type="text"
                            className={`${type}__input`}
                            required
                            ref={inputRef}
                            onChange={(e) => handleInput(e)}
                        >
                        </input>
                        <button type="submit" className={`${type}__btn`}>
                            <img src={searchBtn} alt="search"></img>
                        </button>
                    </>
                )
            }
        </form>
    )
}

export default FilterWithInput
