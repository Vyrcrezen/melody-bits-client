
export function logoutUser() {
    localStorage.removeItem('vy-auth');
    window.location.reload();
}