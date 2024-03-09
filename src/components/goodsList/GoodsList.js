import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import GoodsItem from './goodsItem/GoodsItem'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination/Pagination'
import useServer from '../../hooks/useServer'
import { selectActiveTypeFilter, selectActiveValueFilter } from '../redux/filterSlice'
import { selectCurrentPage, setCurrentPage } from '../redux/pagintaionSlice'

import './goodsList.scss'

const GoodsList = () => {
    const { isLoading, goods, getGoods, countPages } = useServer()

    const dispatch = useDispatch()
    const currPage = useSelector(selectCurrentPage)

    const filterType = useSelector(selectActiveTypeFilter)
    const filterValue = useSelector(selectActiveValueFilter)

    useEffect(() => {
        getGoods(currPage - 1, 50, {type: filterType, value: filterValue})
    }, [filterValue, currPage])

    const incrementPage = () => {
        dispatch(setCurrentPage(currPage + 1))
    }

    const decrementPage = () => {
        dispatch(setCurrentPage(currPage - 1))
    }

    const setPage = (value) => {
        dispatch(setCurrentPage(value))
    }

    return (
        <>
            <div className='goodslist'>
                { isLoading
                    ? (<Spinner />) 
                    : (
                        <>
                            {goods.map((item, i) => {
                                return <GoodsItem 
                                            good={item} 
                                            key={i}
                                        />
                            })}
                        </>
                    )          
                }
            </div>    
            <Pagination 
                incrementPage={incrementPage}
                decrementPage={decrementPage}
                setPage={setPage}
                currentPage={currPage}
                totalPage={countPages}
            />
        </>
    )
}

export default GoodsList