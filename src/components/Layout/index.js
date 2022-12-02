import classNames from 'classnames/bind'
import Header from './Header'
import Footer from './Footer'

import styles from './Defaultlayout.module.scss'
const cx = classNames.bind(styles)
function Defaultlayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {children}
            </div>
            <Footer />
        </div>
    )

}
export default Defaultlayout