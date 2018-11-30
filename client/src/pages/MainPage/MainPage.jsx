import React from 'react';

const MainPage = (props) => {
    return (
        <div className='MainPage'>
            {props.NavBar}
            <br />
            Main Page - Welcome!
    </div>
    );
};

export default MainPage;