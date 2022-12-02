import styles from './Cart.module.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteToCart, updateTocart } from '../../reducers/cart/cartSlice';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Cart() {
    const dispatch = useDispatch()
    const handleUpdateCart = (product, action) => {
        sessionStorage.setItem('action', action)
        dispatch(updateTocart(product))
    }

    const cart = useSelector(state => state.cart)

    return (<div className={cx('cart')}>
        <div className={cx('cart__title')}>CART</div>
        <div className={cx('cart__container')}>
            <div className={cx('cart__content')}>

                <ul className={cx('cart__label')}>
                    <li></li>
                    <li>PRODUCT</li>
                    <li>PRICE</li>
                    <li>QUANTITY</li>
                    <li>SUBTOTAL</li>
                </ul>
                {
                    cart.cartItem.length == 0 ?
                        <div className={cx('cart__empty')}>
                            <span>Your cart is empty go</span>
                            <Link to='/shop'>SHOP NOW</Link>
                        </div>
                        : cart.cartItem.map(item => {
                            if (cart.cartItem.length != 0)
                                return (
                                    <ul key={item._id} className={cx('cart__item')}>
                                        <li className={cx('cart__img')}>
                                            <img src={require(`../../../public/img/product/${item.img}`)} />
                                        </li>
                                        <li className={cx('cart__name')}>{item.name}</li>
                                        <li className={cx('cart__price')}>${item.price}.00</li>
                                        <li className={cx('cart__quanlity')}>
                                            <button onClick={() => handleUpdateCart(item, false)}>-</button>
                                            {item.cartQuanlity}
                                            <button onClick={() => handleUpdateCart(item, true)}>+</button>
                                        </li>
                                        <li className={cx('cart__subtotal')}>${parseInt(item.price) * parseInt(item.cartQuanlity)}.00</li>
                                        <li className={cx('cart__clear')}>
                                            <span onClick={() => {
                                                dispatch(deleteToCart(item))
                                            }}>X</span>
                                        </li>
                                    </ul>)

                        })
                }

            </div>
            <div className={cx('cart__contentReponsive')}>
                {
                    cart.cartItem.length == 0 ?
                        <div className={cx('cart__empty')}>
                            <span>Your cart is empty go</span>
                            <Link to='/shop'>SHOP NOW</Link>
                        </div>
                        : cart.cartItem.map(item => {
                            if (cart.cartItem.length != 0)
                                return (
                                    <ul key={item._id} className={cx('cartRepon__item')}>
                                        <li className={cx('cartRepon__img')}>
                                            <img src={require(`../../../public/img/product/${item.img}`)} />
                                            <span className={cx('cart__name')}>{item.name}</span>
                                        </li>
                                        <li className={cx('cartRepon__quanlity')}>
                                            <span>QUANTITY</span>
                                            <div className={cx('cartRepon__service')} >
                                                <button onClick={() => handleUpdateCart(item, false)}>-</button>
                                                {item.cartQuanlity}
                                                <button onClick={() => handleUpdateCart(item, true)}>+</button>
                                            </div>


                                        </li>
                                        <li className={cx('cartRepon__price')}>
                                            <span> PRICE</span>
                                            <span>${item.price}.00</span>
                                        </li>

                                        <li className={cx('cartRepon__subtotal')}>
                                            <span>SUBTOTAL</span>
                                            <span>${parseInt(item.price) * parseInt(item.cartQuanlity)}.00</span>
                                        </li>
                                        <li className={cx('cartRepon__clear')}>
                                            <span onClick={() => {
                                                dispatch(deleteToCart(item))
                                            }}>X</span>
                                        </li>
                                    </ul>)

                        })
                }


            </div>
            <div className={cx('cart__service')}>
                <div>
                    <input type="text" placeholder="Coupon code.." />
                    <button>APPLY</button>
                </div>

                <div>
                    <span>${
                        cart.cartItem.reduce((sum, item) => {
                            return sum + (parseInt(item.price) * parseInt(item.cartQuanlity))
                        }, 0)
                    }.00</span>
                    <button onClick={() => {
                        const isLogin = sessionStorage.getItem('isLogin')
                        if (isLogin && isLogin === 'true') {
                            dispatch(clearCart())
                            Swal.fire({
                                icon: 'success',
                                title: 'Check out success...',
                                text: '!',
                            })
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'You need Login!',
                            })
                        }

                    }}>CHECK OUT</button>
                </div>

            </div>
        </div>
    </div >)
}
export default Cart