
import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { faFacebook, faTwitter, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons'

import Banerbot from './Bannerbot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const cx = classNames.bind(styles)
function Footer() {

    return (
        <div className={cx('footer')}>
            <Banerbot />
            <div className={cx('footer__content')}>
                <ul className={cx('footer__list')}>
                    <li className={cx('footer__title')}>Shopee</li>
                    <li className={cx('footer__item')}>Shoppe is a powerful shop theme created by HungTran
                        <br />
                        It’s powered by WooCommerce and is highly customizable.

                    </li>
                    <li className={cx('footer__item')}>
                        <button>Dowload</button>
                    </li>

                </ul>

                <ul className={cx('footer__list')}>
                    <li className={cx('footer__title')}>Social</li>
                    <li className={cx('footer__item')}>
                        <FontAwesomeIcon icon={faTwitter} />
                        <span>Twitter</span>
                    </li>
                    <li className={cx('footer__item')}>
                        <FontAwesomeIcon icon={faFacebook} />
                        <span>Facebook</span>
                    </li>
                    <li className={cx('footer__item')}>
                        <FontAwesomeIcon icon={faYoutube} />
                        <span>Youtube</span>
                    </li>
                    <li className={cx('footer__item')}>
                        <FontAwesomeIcon icon={faPinterest} />
                        <span>Pinterest</span>
                    </li>

                </ul>
                <ul className={cx('footer__list')}>
                    <li className={cx('footer__title')}>Categoties</li>
                    <li className={cx('footer__item')}>Access</li>
                    <li className={cx('footer__item')}>Kids</li>
                    <li className={cx('footer__item')}>Man</li>
                    <li className={cx('footer__item')}>Woman</li>
                    <li className={cx('footer__item')}>Technology</li>

                </ul>
                <ul className={cx('footer__list')}>
                    <li className={cx('footer__title')}>About</li>
                    <li className={cx('footer__item')}>Company</li>
                    <li className={cx('footer__item')}>Our story</li>
                    <li className={cx('footer__item')}>Locations</li>
                    <li className={cx('footer__item')}>Team</li>
                    <li className={cx('footer__item')}>Investors</li>                </ul>
                <ul className={cx('footer__list')}>
                    <li className={cx('footer__title')}>Support</li>
                    <li className={cx('footer__item')}>Order</li>
                    <li className={cx('footer__item')}>Refund</li>
                    <li className={cx('footer__item')}>Complaints</li>
                    <li className={cx('footer__item')}>Help</li>
                    <li className={cx('footer__item')}>Contact  </li>                </ul>


            </div>

        </div>
    )
}
export default Footer