import styles from './Bannerbot.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons'

const cx = classNames.bind(styles)

function Banerbot() {
    return (
        <div className={cx('banner')}>
            <div className={cx('banner__twitter')}>
                <div className={cx('banner__content')}>
                    <div className={cx('twitter__overlay')}></div>
                    <div className={cx('banner__innercontent')}>
                        <FontAwesomeIcon icon={faTwitter} />
                        <span>TWITTER</span>
                    </div>
                </div>
            </div>
            <div className={cx('banner__facebook')}>
                <div className={cx('banner__content')}>
                    <div className={cx('facebook__overlay')}></div>
                    <div className={cx('banner__innercontent')}>
                        <FontAwesomeIcon icon={faFacebook} />
                        <span>FACEBOOK</span>
                    </div>
                </div>
            </div>
            <div className={cx('banner__pinterest')}>
                <div className={cx('banner__content')}>
                    <div className={cx('pinterest__overlay')}></div>
                    <div className={cx('banner__innercontent')}>
                        <FontAwesomeIcon icon={faPinterest} />
                        <span>PINTEREST</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banerbot