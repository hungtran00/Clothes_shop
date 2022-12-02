import Sidebar from "../../components/Layout/Container/Sidebar";
import styles from "./Shop.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../reducers/product/productSlice'
import { faSquareCaretRight, faSquareCaretLeft, faHeart, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { addToCart } from "../../reducers/cart/cartSlice";
import Loading from "../Loading";
const cx = classNames.bind(styles)
function Shop() {
    const dataType = []
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        dispatch(getProduct())
    }, [])
    const callbackFunction = (data) => {
        data?.map(item => {
            dataType.push(item)
        })
        if (dataType.length != 0)
            setData(dataType)
    }
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    const HandleRenderProduct = () => {
        const loop = data.length != 0 ? data : product.data
        return (
            <div className={cx('product')}>
                {

                    loop.map((item, index) => {
                        const imgUrl = `img/product/${item.img}`
                        const path = `/shop/${item._id}`
                        return (<div className={cx("product__item")} key={item._id}>
                            <Link to={path}>
                                <img src={imgUrl} className={cx('product__img')} />
                                <div className={cx('product__name')} >{item.name}</div>
                                <div className={cx('product__price')}>${item.price}.00</div>

                            </Link>
                            <div className={cx('product__service')}>
                                <button onClick={() => handleAddToCart(item)} className={cx('product__button')}>ADD TO CART</button>
                                <div className={cx('product__icon')}>
                                    <span><FontAwesomeIcon icon={faHeart} /></span>
                                    <span><FontAwesomeIcon icon={faSearch} /></span>
                                    <span><FontAwesomeIcon icon={faUpload} /></span>
                                </div>
                            </div>
                        </div>

                        )
                    })
                }
            </div >
        )




    }


    return (

        <div className={cx('wrapper')}>


            <div className={cx('content')}>
                {product.data.length != 0 ? <HandleRenderProduct /> : <Loading />}

            </div>
            <div className={cx('side__bar')}>
                <Sidebar parentCallback={
                    callbackFunction
                } />
            </div>
            <div onClick={() => { setShowSidebar(true) }} className={cx('showModal')}>
                <FontAwesomeIcon icon={faSquareCaretLeft} />
            </div>

            <div style={{ display: showSidebar ? "block" : "none" }} className={cx('side__bar__modal')}>
                <div onClick={() => { setShowSidebar(false) }} className={cx('hideModal')}>
                    <FontAwesomeIcon icon={faSquareCaretRight} />
                </div>
                <Sidebar parentCallback={
                    callbackFunction
                } />
            </div>
        </div>
    );
}
export default Shop