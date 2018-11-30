import axios from 'axios';
import AuthError from '../utils/AuthError';

function setToken(token) {
    if (token) {
        localStorage.setItem('mernToken', token);
        return true;
    } else {
        removeToken();
        return false;
    }
}

function removeToken() {
    localStorage.removeItem('mernToken');
}

function checkForLocalToken() {
    // Look in local storage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
        removeToken();
        return false;
    } 

    // Token found in localStorage - send it to the back for verification
    axios.post('/auth/me/from/token', {token})
        .then(result => {
            if (result.data.type !== 'success') {
                console.log(result.data);
                throw new AuthError('Authentication challenge failed');
            } else {
                // Success - Put the token in localStorage
                localStorage.setItem('mernToken', result.data.token)
                let ret = {
                    token: result.data.token,
                    user: result.data.user
                }
                return ret;
            }
    })
}

export default {  
    setToken,
    removeToken,
    checkForLocalToken
}