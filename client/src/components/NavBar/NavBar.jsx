import React from 'react';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = (props) => {
    return (
        <nav className={styles.NavBar}>
            {(props.user) ?
                // Logged in navbar options
                <>  
                    <div className={styles.left}>
                        <span className={styles.navItem}>{props.user.name}</span>&nbsp;|&nbsp;
                        <Link className={styles.navItem} to='/'>Home</Link>&nbsp;
                        <Link className={styles.navItem} to='/groups'>Groups</Link>&nbsp;
                    </div>
                    <div className={styles.right}>
                        <Link className={styles.navItem} to='/account'>My Account</Link>&nbsp;
                        <Link className={styles.navItem} to="/" onClick={props.handleLogout} >Log out</Link>&nbsp;
                    </div>
                </>
                :
                // Logged out navbar options
                <>  
                    <div className={styles.left}>
                        <Link className={styles.navItem} to='/'>Home</Link>&nbsp;
                        <Link className={styles.navItem} to='/groups'>Groups</Link>&nbsp;
                    </div>
                    <div className={styles.right}>
                        <Link className={styles.navItem} to='/signup'>Sign up</Link>&nbsp;
                        <Link className={styles.navItem} to='/login'>Log in</Link>&nbsp;
                    </div>
                </>
            }
        </nav>
    );
};

export default NavBar;