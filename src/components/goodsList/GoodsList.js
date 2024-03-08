import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import GoodsItem from './goodsItem/GoodsItem'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination/Pagination'
import useServer from '../../hooks/useServer'
import { selectActiveTypeFilter, selectActiveValueFilter } from '../redux/filterSlice'

import './goodsList.scss'

const GoodsList = () => {
    const [currPage, setCurrPage] = useState(1)

    const { isLoading, goods, getGoods, countPages } = useServer()

    const filterType = useSelector(selectActiveTypeFilter)
    const filterValue = useSelector(selectActiveValueFilter)

    useEffect(() => {
        getGoods(currPage - 1, 50, {type: filterType, value: filterValue})
    }, [filterValue, currPage])

    const incrementPage = () => {
        setCurrPage(currPage + 1)
    }

    const decrementPage = () => {
        setCurrPage(currPage - 1)
    }

    const setPage = (value) => {
        setCurrPage(value)
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