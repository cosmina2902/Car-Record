import axios from 'axios'


const AUTH_REST_API_BASE_URL = "http://localhost:8080/auth"

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { usernameOrEmail, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const getEmail = () => localStorage.getItem("email");
export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}

export const isAdminUser = () => {

    let role = sessionStorage.getItem("role");

    if(role != null && role === 'ROLE_ADMIN'){
        return true;
    }
    else{
        return false;
    }

} 

export const saveEmailUser = (email) => {
    sessionStorage.setItem("email", email)
}

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null)
        return false;
    else
        return true;
}

export const getLoggedInUser = () =>{
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
} 

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const forgotPassword = (email) => {
    return axios.put(`${AUTH_REST_API_BASE_URL}/forgot`, null, {
        params: { email }
    });
}

export const changePassword = (email, number, password) => {
    return axios.put(`${AUTH_REST_API_BASE_URL}/set-new-password`, null, {
        params : {
            email, number
        },
        headers: {
            'password': password
        }
        
    })
}