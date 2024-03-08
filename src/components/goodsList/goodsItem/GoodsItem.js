
const GoodsItem = ({good}) => {
    return (
        <div className='goodslist-item' >
            <div className="goodslist-item__name">{good.product}</div>
            <div className="goodslist-item__brand">Бренд: {good.brand}</div>
            <div className="goodslist-item__bottom">
                <div className="goodslist-item__bottom-price">{good.price}</div>
                <div className="goodslist-item__bottom-id">{good.id}</div>
            </div>
        </div>
    )
}

export default GoodsItem