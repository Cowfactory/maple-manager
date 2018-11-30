import axios from 'axios';

function setToken(token) {
    if (token) {
        console.log("Saving token in localStorage via tokenService::setToken()")
        localStorage.setItem('mernToken', token);
        return true;
    } else {
        console.log("No token found in storage via tokenService::setToken()")
        removeToken();
        return false;
    }
}

function removeToken() {
    localStorage.removeItem('mernToken');
}

function authMeFromToken() {
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
                throw new Error(result.data.message);
            } else {
                // Success - Put the token in localStorage
                console.log("Auth me success - ", result)
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
    authMeFromToken
}