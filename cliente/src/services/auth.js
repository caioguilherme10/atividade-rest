export const isAuthenticatedNode = () => localStorage.getItem('@token') !== null;

export const isAuthenticated = () => {
    if (isAuthenticatedNode()) {    
        return true
    } else {
        return false
    }
};

export const logout = () => {
    localStorage.removeItem('@token');
    localStorage.removeItem('user');
};