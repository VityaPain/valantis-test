import { useState, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"

import md5 from 'md5'
// import 'dotenv/config'

import { selectActiveValueFilter, selectActiveTypeFilter } from "../components/redux/filterSlice"

const useServer = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [goods, setGoods] = useState([])
    const [countPages, setCounPages] = useState(1)
    const limit = 50

    const activeValueFilter = useSelector(selectActiveValueFilter)

    const getCypherPassword = useCallback(() => {
        const date = new Date(),
              year = date.getUTCFullYear(),
              month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1,
              day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()

        return md5(`Valantis_${year}${month}${day}`)
    }, [])

    const authValue = getCypherPassword()

    const requestObjectList = useCallback(
        async(
            body,
            url = 'http://api.valantis.store:40000/',
            method = 'POST',
            headers = {
                'Content-Type': 'application/json',
                'X-Auth': `${authValue}`,
            }
        ) => {

            while (true) {
                try {
                    const responce = await fetch(url, { method, body, headers })
        
                    return await responce.json()
                } catch (error) {
                    console.error('Произошла ошибка:', error);

                }
            }
        },
        []
    )

    const arrayWithoutDoubles = (arr) => {
        const res = []
        arr.forEach((item, i, arr) => {
            if (!arr.slice(0, i).some(pr => pr.id === item.id)) {
                res.push(item)
            }
        })

        return res
    }

    const getGoods = useCallback(async (offset = 0, limit = 50, filter = {}) => {
        setIsLoading(true)

        if (filter.type) {
            const body = JSON.stringify({
                action: "filter",
                params: { [filter.type]: filter.value}
            })
    
            const res = await requestObjectList(body)
    
            setCounPages(Math.ceil(res.result.length / limit))

            getGoodsByIds(res.result, offset, 'filter')
        } else {
            const body = JSON.stringify({
                action: "get_ids",
                params: {"offset": offset, "limit": limit} 
            })

            const res = await requestObjectList(body)

            const correctIds = Array.from(new Set(res.result))

            getGoodsByIds(correctIds, offset)
        }
    }, [])

    const getGoodsByIds = useCallback(async (ids, offset, type = '') => {
        const body = JSON.stringify({
            action: "get_items",
            params: { "ids": ids }
        })

        const res = await requestObjectList(body)

        const goods = arrayWithoutDoubles(res.result)

        if (type === 'filter') {
            setIsLoading(false)
            setGoods(goods.slice(limit * (offset - 0), limit * (offset - 0) + limit))
        } else {
            if (goods.length < limit) {
                getGoods(offset, limit + limit - goods.length )
            } else {
                setIsLoading(false)
                setGoods(goods)
            }
        }
    }, [])

    const getAllBrands = async () => {
        const body = JSON.stringify({
            action: "get_fields",
            params: {"field": "brand"}
        })

        const res = await requestObjectList(body)

        return Array.from(new Set(res.result.filter(item => item)))
    }

    const selectCountPages = useMemo(async () => {
        if (!activeValueFilter) {
            const body = JSON.stringify({
                action: "get_ids",
                params: { }
            })
    
            const res = await requestObjectList(body)

            setCounPages(Math.ceil(Array.from(new Set(res.result)).length / limit))
        } 
    }, [activeValueFilter])

    return {
        isLoading,
        goods,
        getAllBrands,
        getGoods,
        countPages,
    }
}

export default useServer