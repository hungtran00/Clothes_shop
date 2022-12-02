import styles from './Banner.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function Banner() {
    const scrollToProduct = () => {
        var screenHeight = window.innerHeight
        window.scrollTo(0, screenHeight)
    }
    return (
        <div className={cx('bannertop')}>
            <div className={cx('bannertop__container')}>
                <div className={cx('bannertop__title')}>
                    Welcome
                </div>
                <div className={cx('bannertop__content')}>
                    This page designed by Nguyn :3. If you see it. Have a good day
                </div>
                <button onClick={scrollToProduct} className={cx('bannertop__button')}>SHOP NOW</button>
            </div>

        </div>

    )
}
export default Banner