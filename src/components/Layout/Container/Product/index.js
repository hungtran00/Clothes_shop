import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProduct } from '../../../../reducers/product/productSlice'
import Loading from '../../../../pages/Loading'
import { Link } from 'react-router-dom'
import { addToCart } from '../../../../reducers/cart/cartSlice'



const cx = classNames.bind(styles)
function Product() {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getProduct())
    }, [])
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className={cx('product')}>
            <div className={cx('product__title')}>
                Products
            </div>
            <div className={cx('product__list')}>
                {
                    product.data.length == 0 ? <Loading /> : product.data.map((item, index) => {

                        const imgSrc1 = `img/product_home/${item.img}`
                        const imgSrc2 = `img/product_home/1-${item.img}`
                        const path = `/shop/${item._id}`
                        if (index < 6)
                            return (
                                <div key={item._id} className={cx('product__item')}>
                                    <Link to={path} className={cx('product__img')}>
                                        <img src={imgSrc1} />
                                        <img className={cx('img__change')} src={imgSrc2} />

                                    </Link>
                                    <div className={cx('product__content')}>
                                        <div className={cx('product__innercontent')}>
                                            <span>{item.name}</span>
                                            <span>${item.price}.00</span>
                                            <button onClick={() => handleAddToCart(item)}>ADD TO CART</button>
                                            <div className={cx('product__icon')}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    })
                }
                {/* <div className={cx('product__item')}>
                    <div className={cx('product__img')}>
                        <img src="img/product_home/model-wearing-summer-dress-1200x1324-650x650.jpg" />
                        <img className={cx('img__change')} src="img/product_home/model-wearing-summer-dress-2-1200x1324-600x600.jpg" />

                    </div>
                    <div className={cx('product__content')}>
                        <div className={cx('product__innercontent')}>
                            <span>Title</span>
                            <span>$135.00</span>
                            <button>ADD TO CART</button>
                            <div className={cx('product__icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product__item')}>
                    <div className={cx('product__img')}>
                        <img src="img/product_home/man-wear-black-trench-coat-1200x1324-650x650.jpg" />
                        <img className={cx('img__change')} src="img/product_home/man-wear-black-trench-coat-2-1200x1324-600x600.jpg" />
                    </div>
                    <div className={cx('product__content')}>
                        <div className={cx('product__innercontent')}>
                            <span>Title</span>
                            <span>$135.00</span>
                            <button>ADD TO CART</button>
                            <div className={cx('product__icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product__item')}>
                    <div className={cx('product__img')}>
                        <img src="img/product_home/model-wearing-stylish-polka-shirt-1200x1324-650x650.jpg" />
                        <img className={cx('img__change')} src="img/product_home/model-wearing-stylish-polka-shirt-4-1200x1324-600x600.jpg" />
                    </div>
                    <div className={cx('product__content')}>
                        <div className={cx('product__innercontent')}>
                            <span>Title</span>
                            <span>$135.00</span>
                            <button>ADD TO CART</button>
                            <div className={cx('product__icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product__item')}>
                    <div className={cx('product__img')}>
                        <img src="img/product_home/model-wearing-white-t-shirt-1200x1324-650x650.jpg" />
                        <img className={cx('img__change')} src="img/product_home/model-wearing-white-t-shirt-2-1200x1324-600x600.jpg" />
                    </div>
                    <div className={cx('product__content')}>
                        <div className={cx('product__innercontent')}>
                            <span>Title</span>
                            <span>$135.00</span>
                            <button>ADD TO CART</button>
                            <div className={cx('product__icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product__item')}>
                    <div className={cx('product__img')}>
                        <img src="img/product_home/teen-wear-loose-fit-1200x1324-600x600.jpg" />
                        <img className={cx('img__change')} src="img/product_home/teen-wear-loose-fit-2-1200x1324-600x600.jpg" />
                    </div>
                    <div className={cx('product__content')}>
                        <div className={cx('product__innercontent')}>
                            <span>Title</span>
                            <span>$135.00</span>
                            <button>ADD TO CART</button>
                            <div className={cx('product__icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Product