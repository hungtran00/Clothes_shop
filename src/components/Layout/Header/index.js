
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { faBars, faXmark, faLocationDot, faUserTie, faEnvelope, faHeart, faCartShopping, faL } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteToCart } from '../../../reducers/cart/cartSlice'


const cx = classNames.bind(styles)

function Header() {
    const [selectCart, setSelectCart] = useState(false)
    const [selectMenu, setSelectMenu] = useState(false)

    let activeStyle = {
        color: "var(--primary-color)"
    }
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const cartPrice = cart.cartItem.map(item => {
        return {
            price: parseInt(item.price),
            quanlity: item.cartQuanlity
        }
    })

    const handleClear = (item) => {
        dispatch(deleteToCart(item))
    }
    return (<Fragment>

        <div className={cx('header')}>
            <div className={cx('header__menu')}>
                <ul className={cx('header__list')}>

                    <NavLink to='/' style={({ isActive }) => isActive ? activeStyle : undefined} className={cx('header__item')} end><span>HOME</span></NavLink>
                    <NavLink to='/shop' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>SHOP</span></NavLink>
                    <NavLink to='/blog' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>BLOG</span></NavLink>
                    <NavLink to='/features' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>FEATURES</span></NavLink>
                </ul>
            </div>
            <div className={cx('header__title')}>
                <Link to='/'>SHOPPE</Link>
            </div>
            <div className={cx('header__icon')}>
                <span>

                    <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <span>
                    <NavLink className={({ isActive }) => isActive ? cx("activeNav") : undefined} to="/login">
                        <FontAwesomeIcon icon={faUserTie} />
                    </NavLink>
                </span>
                <span>

                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span>

                    <FontAwesomeIcon icon={faHeart} />
                </span >
                <span style={{ position: "relative" }} onClick={
                    () => { selectCart ? setSelectCart(false) : setSelectCart(true) }
                }>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className={cx('cart__count')}>{
                        cart.cartItem.reduce((count, item) => {
                            return count + item.cartQuanlity
                        }, 0)
                    }</span>
                </span>
                <span onClick={
                    () => { selectMenu ? setSelectMenu(false) : setSelectMenu(true) }
                } >
                    <FontAwesomeIcon icon={faBars} />
                </span>
            </div>

        </div>
        <div className={cx('cart__modal')} style={{ display: selectCart ? "block" : "none" }}>
            <div className={cx('cart__banner')}>
                <span onClick={() => { setSelectCart(false) }}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            <div className={cx('cart__container')}>
                {
                    cart.cartItem.map(item => {
                        return (<div key={item._id} className={cx('cart__item')}>
                            {/* <img src={`img/product/${item.img}`} /> */}
                            <img src={require(`../../../../public/img/product/${item.img}`)} />
                            <div className={cx("item__description")}>
                                <div className={cx('item__name')}>{item.name}</div>
                                <div className={cx('item__quanlity')}>x{item.cartQuanlity}</div>
                            </div>
                            <span onClick={() => handleClear(item)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>

                        </div>)
                    })
                }
            </div>
            <div className={cx('cart__footer')}>
                <Link className={cx('cart__view')} to="/cart">VIEW CART</Link>
                <div className={cx('cart__price')}>Total: $
                    {
                        cartPrice.reduce((price, item) => {
                            return price + (item.price * item.quanlity)
                        }, 0)
                    }
                </div>
            </div>
        </div>
        <div className={cx('menu__modal')} style={{ display: selectMenu ? "block" : "none" }}>
            <div className={cx('menu__banner')}>
                <span onClick={() => { setSelectMenu(false) }}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            <div className={cx('menu__container')}>
                <div className={cx('menu__icon')}>
                    <span>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span>
                        <NavLink className={({ isActive }) => isActive ? cx("activeNav") : undefined} to="/login">
                            <FontAwesomeIcon icon={faUserTie} />
                        </NavLink>
                    </span>
                    <span>

                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span>

                        <FontAwesomeIcon icon={faHeart} />
                    </span >
                </div>

                <ul className={cx('menu__list')}>
                    <NavLink to='/' style={({ isActive }) => isActive ? activeStyle : undefined} className={cx('header__item')} end><span>HOME</span></NavLink>
                    <NavLink to='/shop' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>SHOP</span></NavLink>
                    <NavLink to='/blog' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>BLOG</span></NavLink>
                    <NavLink to='/features' className={({ isActive }) => isActive ? cx("activeNav", "header__item") : cx("header__item")} ><span>FEATURES</span></NavLink>
                </ul>

            </div>
        </div>
    </Fragment>

    )

}

export default Header