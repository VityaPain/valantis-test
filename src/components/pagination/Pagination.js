import './pagination.scss'

const Pagination = ({
    incrementPage, 
    decrementPage, 
    setPage,
    currentPage, 
    totalPage
}) => {

    const renderSelectForPages = (totalPages) => {
        const handleChange = (e) => {
            setPage(e.target.value)
        }

        const res = []
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                res.push((
                    <option 
                        key={i}
                        selected
                        className="pagination-current__item"
                        value={i}
                    >
                        {i}
                    </option>
                ))
            } else {
                res.push((
                    <option 
                        key={i}
                        className="pagination-current__item"
                        value={i}
                    >
                        {i}
                    </option>
                ))
            }
        }

        return (
            <select 
                className="pagination-current"
                onChange={(e) => handleChange(e)}
            >
                {res}
            </select>
        )
    }

    const current = renderSelectForPages(totalPage)

    return (
        <div className="pagination"
        >
            <div
                className="pagination__decrement arrow"
                onClick={() => decrementPage()}
            >
                &larr;
            </div>
            {current}
            <div
                className="pagination__increment arrow"
                onClick={() => incrementPage()}
            >
                &rarr;
            </div>
        </div>
    )
}

export default Pagination