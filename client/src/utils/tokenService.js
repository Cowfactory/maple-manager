import axios from 'axios';

function setToken(token) {
    if (token) {
        console.log("Saving token in localStorage via tokenService::setToken()")
        localStorage.setItem('mapleToken', token);
        return true;
    } else {
        console.log("No token found in storage via tokenService::setToken()")
        removeToken();
        return false;
    }
}

function removeToken() {
    localStorage.removeItem('mapleToken');
}

function authMeFromLocalToken() {
    return new Promise((resolve, reject) => {
        // Look in local storage for the token
        let token = localStorage.getItem('mapleToken')
        if (!token || token === 'undefined') {
            removeToken();
            reject('No token in localStorage');
        } 
    
        // Token found in localStorage - send it to the back for verification
        axios.post('/auth/me/from/token', {token})
            .then(result => {
                if (result.data.type !== 'success') {
                    reject(result.data.message);
                } else {
                    // Success - Put the token in localStorage
                    localStorage.setItem('mapleToken', result.data.token)
                    let ret = {
                        token: result.data.token,
                        user: result.data.user
                    }
                    resolve(ret);
                }
        })
    })
}

export default {  
    setToken,
    removeToken,
    authMeFromLocalToken
}