import React from 'react';
import CharacterCreateForm from '../../components/CharacterCreateForm/CharacterCreateForm';

const AccountPage = (props) => {
    return (
        <div className='AccountPage'>
            {props.NavBar}
            <br />
            Account Page
            <CharacterCreateForm />
            {}
        </div>
    );
};

export default AccountPage;