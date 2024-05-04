export const saveLoggedInUser = (username) => {
    sessionStorage.setItem("authenticatedUser", username)
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