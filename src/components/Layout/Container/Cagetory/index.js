import styles from './Cagetory.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);
function Cagetory() {
    return (
        <div className={cx('cagetory')}>
            <div className={cx('cagetory__item')}>
                <div className={cx('cagetory__overlay')}></div>
                <div className={cx('cagetory__img')}>
                    <img src="img/cagetory/woman-cat.jpg" alt='woman-cart' />
                </div>
                <div className={cx('cagetory__title')}>
                    <span>Woman</span>
                </div>
            </div>
            <div className={cx('cagetory__item')}>
                <div className={cx('cagetory__overlay')}></div>
                <div className={cx('cagetory__img')}>

                    <img src="img/cagetory/men-category.jpg" alt='woman-cart' />
                </div>

                <div className={cx('cagetory__title')}>
                    <span>Man</span>
                </div>
            </div>
            <div className={cx('cagetory__item')}>
                <div className={cx('cagetory__overlay')}></div>
                <div className={cx('cagetory__img')}>

                    <img src="img/cagetory/accesores-category.jpg" alt='woman-cart' />
                </div>

                <div className={cx('cagetory__title')}>
                    <span>Accesores</span>
                </div>
            </div>
            <div className={cx('cagetory__item')}>
                <div className={cx('cagetory__overlay')}></div>
                <div className={cx('cagetory__img')}>
                    <img src="img/cagetory/tech.jpg" alt='woman-cart' />

                </div>

                <div className={cx('cagetory__title')}>
                    <span>Technology</span>
                </div>
            </div>
        </div >
    )
}

export default Cagetory
