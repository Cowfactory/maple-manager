import React from 'react';

const AccountPage = (props) => {
    console.log(props.user)
    return (
        <div className='AccountPage'>
            {props.NavBar}
            <br />
            Account Page
            {}
    </div>
    );
};

export default AccountPage;