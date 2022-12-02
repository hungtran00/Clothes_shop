import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProduct } from "../../reducers/product/productSlice"
import styles from './ProductDetail.module.scss'
import classNames from "classnames/bind"
import { addToCart } from "../../reducers/cart/cartSlice"

const cx = classNames.bind(styles)

function ProductDetail() {
    const params = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)

    // const cart = useSelector(state => state.cart)
    const [cartQuanlity, setCartQuanlity] = useState(1)
    useEffect(() => {
        dispatch(getProduct())

    }, [])

    const handleAddToCart = (product, quanlity) => {
        sessionStorage.setItem('quantity', quanlity)
        dispatch(addToCart(product))
    }
    return (
        <div className={cx("product")}>
            {
                product.data.map(item => {
                    if (item._id == params.id)
                        return (<Fragment key={item._id} >
                            <div className={cx('product__img')}>
                                <img src={require(`../../../public/img/product/${item.img}`)} />
                            </div>
                            <div className={cx("product__description")}>
                                <div className={cx('product__title')}>{item.name}</div>
                                <div className={cx('product__price')}>${item.price}.00</div>
                                <div className={cx('product__detail')}>{item.detail}</div>
                                <div className={cx('product__service')}>
                                    <input type="number" value={cartQuanlity} min="1" max="1000" onChange={(e) => setCartQuanlity(parseInt(e.target.value))} />
                                    <button onClick={() => handleAddToCart(item, cartQuanlity)}>ADD TO CART</button>
                                </div>

                                <div className={cx('product__category')}>Category:<span>{item.category}</span></div>
                            </div>
                        </Fragment>)
                })
            }

        </div >)
}
export default ProductDetail