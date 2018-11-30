import React from 'react';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = (props) => {
    let loggedOutContent = (
        <>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/login'>Log in</Link>&nbsp;
            <Link to='/signup'>Sign up</Link>&nbsp;
        </>
    );

    let loggedInContent = (
        <>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/account'>My Account</Link>&nbsp;
            <Link to="/" onClick={props.handleLogout} >Log out</Link>&nbsp;
        </>
    );

    return (
        <header className={styles.header}>
            {(props.user) ? loggedInContent : loggedOutContent }
        </header>
    );
};

export default NavBar;