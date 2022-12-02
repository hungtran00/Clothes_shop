import Banner from "../../components/Layout/Container/Banner"
import Cagetory from "../../components/Layout/Container/Cagetory"
import Product from "../../components/Layout/Container/Product"

import classNames from "classnames/bind"
import styles from './Home.module.scss'

const cx = classNames.bind(styles)


function Home() {
    return (<div className={cx('home')}>
        <div className={cx('home__banner')}>
            <Banner />
        </div>

        <div className={cx('home__content')}>
            <Cagetory />
            <Product />
        </div>
    </div>)
}
export default Home