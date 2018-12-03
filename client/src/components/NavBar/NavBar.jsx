import React from 'react';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = (props) => {
    return (
        <header className={styles.header}>
            {(props.user) ?  
                <>
                    <span>{props.user.name} | </span>
                    <Link to='/'>Home</Link>&nbsp;
                    <Link to='/account'>My Account</Link>&nbsp;
                    <Link to="/" onClick={props.handleLogout} >Log out</Link>&nbsp;
                </> : 
                <>
                    <Link to='/'>Home</Link>&nbsp;
                    <Link to='/signup'>Sign up</Link>&nbsp;
                    <Link to='/login'>Log in</Link>&nbsp;
                </>}
        </header>
    );
};

export default NavBar;