import React from 'react';

const MainPage = (props) => {
    return (
        <div className='MainPage'>
            {props.NavBar}
            <br />
            <div>Main Page - Welcome!</div>
    </div>
    );
};

export default MainPage;