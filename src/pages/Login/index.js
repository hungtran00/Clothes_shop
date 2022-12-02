import styles from './Login.module.scss'

import classNames from "classnames/bind";
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../../reducers/account/accountSlice';
import Loading from '../Loading';

const cx = classNames.bind(styles)
function Login() {
    const [showRegister, setShowRegister] = useState(false)
    const [userNameLogin, setuserNameLogin] = useState("")
    const [passwordLogin, setpasswordLogin] = useState("")
    const [userNameRegister, setuserNameRegister] = useState("")
    const [passwordRegister, setpasswordRegister] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const islogin = sessionStorage.getItem('isLogin')
    const [login, setLogin] = useState(islogin)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const nameRegex = /^[a-zA-Z0-9\-]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const dispatch = useDispatch()
    const account = useSelector((state) => state.account)
    useEffect(() => {
        dispatch(getAccount())
    }, [])

    return (

        <Fragment>
            {
                account.data.length == 0 ? <Loading /> :
                    <div className={cx("login")}>
                        <div className={cx('login__title')}>My Account</div>

                        <div className={cx('login__container')}>

                            {
                                login === 'true' ? <div className={cx('customer')}>
                                    <div className={cx('customer__title')}>Thông tin khách hàng</div>
                                    <div className={cx('customer__email')}>
                                        Email:
                                        <span>Comming soon.....</span>
                                    </div>
                                    <div className={cx('customer__username')}>
                                        Username:
                                        <span>Comming soon.....</span>
                                    </div>
                                    <button onClick={() => {
                                        sessionStorage.setItem('isLogin', false)
                                        setMessage("")
                                        setuserNameLogin("")
                                        setpasswordLogin("")
                                        setLogin("false")
                                    }
                                    }>Log out</button>
                                </div> : <Fragment>
                                    <div className={cx('login__group')}>
                                        <label>Username</label>
                                        <input value={userNameLogin} onChange={(e) => setuserNameLogin(e.target.value)} placeholder='Username....' type='text' />
                                    </div>

                                    <div className={cx('login__group')}>
                                        <label>Password</label>
                                        <input value={passwordLogin} onChange={(e) => setpasswordLogin(e.target.value)} placeholder='Password....' type='password' />
                                    </div>
                                    <div className={cx('login__service')}>
                                        <button onClick={
                                            () => {
                                                if (userNameLogin.length != 0 || passwordLogin.length != 0) {

                                                    if (nameRegex.test(userNameLogin) == false) {
                                                        setMessage("Username không hợp lệ")
                                                    }
                                                    else if (passRegex.test(passwordLogin) == false) {
                                                        setMessage("Password ít nhất 6 ký tự bao gồm 1 chữ cái viết hoa, 1 số")
                                                    }
                                                    else {
                                                        const temp = account.data.filter(item => {
                                                            return item.username.toUpperCase() == userNameLogin.toUpperCase() && item.password == passwordLogin
                                                        })
                                                        if (temp.length != 0) {
                                                            sessionStorage.setItem('isLogin', true)

                                                            setLogin("true")
                                                        }

                                                        else
                                                            setMessage("Tài khoản hoặc mật khẩu không đúng")
                                                    }
                                                }
                                                else {
                                                    setMessage("Vui lòng nhập thông tin")
                                                }

                                            }}>Login</button>
                                        <div className={cx('login__register')}>
                                            <span>If you don't have account</span>
                                            <button onClick={() => {
                                                setShowRegister(true)
                                                setMessage("")
                                            }}>
                                                <span >Register </span>
                                            </button>
                                        </div>
                                    </div>
                                    <span className={cx('register__message')}>{message}</span>
                                </Fragment>
                            }

                        </div>
                        <div style={{ display: showRegister ? 'block' : "none" }} className={cx('register')}>
                            <div className={cx('login__title')}>Register</div>
                            <div className={cx('login__group')}>
                                <label>Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email....' type='email' />
                            </div>
                            <div className={cx('login__group')}>
                                <label>Username</label>
                                <input value={userNameRegister} onChange={(e) => setuserNameRegister(e.target.value)} placeholder='Username....' type='text' />
                            </div>

                            <div className={cx('login__group')}>
                                <label>Password</label>
                                <input value={passwordRegister} onChange={(e) => setpasswordRegister(e.target.value)} placeholder='Password....' type='password' />
                            </div>
                            <div className={cx('login__service')}>
                                <button onClick={() => {

                                    if (email.length != 0 || userNameRegister.length != 0 || passwordRegister.length != 0) {
                                        if (emailRegex.test(email) == false) {
                                            setMessage("Email không hợp lệ")
                                        }
                                        else if (nameRegex.test(userNameRegister) == false) {
                                            setMessage("Username không hợp lệ")
                                        }
                                        else if (passRegex.test(passwordRegister) == false) {
                                            setMessage("Password ít nhất 6  ký tự bao gồm 1 chữ cái viết hoa, 1 số")
                                        }
                                        else {
                                            const temp = account.data.filter(item => {
                                                return item.username.toUpperCase() == userNameRegister.toUpperCase()
                                            })
                                            if (temp.length != 0) {
                                                setMessage("User name đã tồn tại")
                                            }
                                            else {
                                                const api = axios.create({ baseURL: 'https://api-shopee-three.vercel.app' })
                                                api.post('/api/customer', {
                                                    username: userNameRegister,
                                                    email: email,
                                                    password: passwordRegister,
                                                    block: 1,
                                                })
                                                    .then(res => {
                                                        setMessage("Đăng ký thành công")

                                                        setShowRegister(false)
                                                        setMessage("")
                                                        setEmail("")
                                                        setpasswordRegister("")
                                                        setuserNameLogin(userNameRegister)
                                                        setLogin("true")
                                                        sessionStorage.setItem('isLogin', true)


                                                    })
                                                    .catch(error => {
                                                        setShowRegister(false)
                                                        setMessage("")

                                                    })
                                            }
                                        }

                                    }
                                    else {
                                        setMessage("Vui lòng nhập thông tin")
                                    }
                                }}>Register</button>
                                <button onClick={() => { setShowRegister(false) }}>Back</button>
                            </div>
                            <span className={cx('register__message')}>{message}</span>
                        </div>
                    </div >
            }


        </Fragment >
    )
}
export default Login