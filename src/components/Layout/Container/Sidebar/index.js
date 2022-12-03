import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'
import { useEffect, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../../../reducers/product/productSlice'

const cx = classNames.bind(styles)


const category =
    [
        { "id": 1, "name": "Womans" },
        { "id": 2, "name": "Kids" },
        { "id": 3, "name": "Accessories" },
        { "id": 4, "name": "Mans" },
        { "id": 5, "name": "Technologys" },
        { "id": 6, "name": "All" },
    ]
const color =
    [
        { "id": 1, "name": "black" },
        { "id": 2, "name": "blue" },
        { "id": 3, "name": "gray" },
        { "id": 4, "name": "pink" },
        { "id": 5, "name": "white" },
    ]
const size =
    [
        { "id": 1, "name": "L" },
        { "id": 2, "name": "M" },
        { "id": 3, "name": "S" },

    ]
function Sidebar(props) {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getProduct())
    }, [])
    //State
    const [check, setCheck] = useState([])
    const [dataResult, setDataResult] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [dataPrice, setDataPrice] = useState([])
    const [dataColor, setDataColor] = useState([])

    const [dataSize, setDataSize] = useState([])



    const sendData = (data) => {
        props.parentCallback(data)
    }
    const [valuePrice, setValuePirce] = useState(1)
    const HandleRenderRad = () => {
        return category.map((item, index) => {
            const className = `category__content__${item}`
            if (item.name !== "All")
                return (
                    <div key={index} className={cx(className)}>
                        <input type='radio' name="type" defaultChecked={check.indexOf(item.id) === -1 ? false : true}
                            onChange={() => {
                                const currentIndex = check.indexOf(item.id)
                                const newCheck = []
                                if (currentIndex === -1)
                                    newCheck.push(item.id)
                                else {
                                    newCheck.splice(currentIndex, 1)
                                }

                                const newData = product.data.filter(product => {
                                    return product.category === item.name
                                })
                                sendData(newData)
                                setDataCategory(newData)
                                setCheck(newCheck)
                            }}
                        />
                        <span>{item.name}</span>
                    </div>)
            else
                return (
                    <div key={index} className={cx(className)}>
                        <input type='radio' name="type" defaultChecked={check.indexOf(item.id) === -1 ? false : true}
                            onChange={() => {
                                const currentIndex = check.indexOf(item.id)
                                const newCheck = []
                                if (currentIndex === -1)
                                    newCheck.push(item.id)
                                else
                                    newCheck.splice(currentIndex, 1)

                                const newData = product.data.map(product => {
                                    return product
                                })
                                sendData(newData)
                                setDataCategory(newData)
                                setCheck(newCheck)
                            }}
                        />
                        <span>{item.name}</span>
                    </div>)
        })
    }

    return (<div className={cx('sidebar')}>
        <div className={cx('sidebar__category')}>
            <div className={cx('category__title')}>Category</div>
            <div className={cx('category__content')} >
                {/* <div className={cx('category__content__women')}>
                    <input type='radio' name="type" />
                    <span>Woman</span>
                </div>
                <div className={cx('category__content__kids')}>
                    <input type='radio' name="type" />
                    <span>Kids</span>
                </div>  <div className={cx('category__content__accessories')}>
                    <input type='radio' name="type" />
                    <span>Accessories</span>
                </div>  <div className={cx('category__content__man')}>
                    <input type='radio' name="type" />
                    <span>Man</span>
                </div>  <div className={cx('category__content__tech')}>
                    <input type='radio' name="type" />
                    <span>Technology</span>
                </div> */}
                <HandleRenderRad />
            </div>
        </div>
        {/* <div className={cx('sidebar__price')}>
            <input type='range' min='1' max='1000' onClick={(e) => {
                const value = e.target.value

                // console.log(dataFilter)
                const newData = product.data.filter((item, index) => {
                    return parseInt(item.price) < parseInt(value)
                }

                )
                sendData(newData)
                setDataPrice(newData)
                setValuePirce(value)


            }} />
            <span>${valuePrice}.00</span>
        </div> */}
        <div className={cx('sidebar__color')}>
            <div className={cx('color__title')}>Products color</div>
            <div className={cx('color__content')}>
                {
                    color.map((item) => {
                        return (<div key={item.id} onClick={() => {
                            const newData = product.data.filter(product => {
                                return product.color.toUpperCase() === item.name.toUpperCase()
                            })
                            sendData(newData)
                            setDataColor(newData)
                        }}></div>)
                    })
                }
            </div>
        </div>
        <div className={cx('sidebar__size')}>
            <div className={cx('size__title')}>Products size</div>

            <div className={cx('size__content')} >
                {
                    size.map((item) => {
                        return (<div key={item.id} onClick={() => {
                            const newData = product.data.filter(product => {
                                return product.size.toUpperCase() === item.name
                            })
                            sendData(newData)
                            setDataSize(newData)
                        }}>{item.name}</div>)
                    })
                }
            </div>
        </div>



    </div>)
}
export default memo(Sidebar)