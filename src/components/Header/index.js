import React from 'react';
import styles from './index.less';
class Header extends React.PureComponent {
    // loginout = () => {
    //     if (this.props.loginout) {
    //         this.props.loginout()
    //     }
    // }
    render() {
        return (
            <div className={styles['header-container']}>
                <div className={styles.right}>
                    <span className={styles.name} style={{ marginLeft: '0.5rem' }}>{sessionStorage.getItem('userName')}</span>
                </div>
            </div>
        );
    }
}

export default Header;
