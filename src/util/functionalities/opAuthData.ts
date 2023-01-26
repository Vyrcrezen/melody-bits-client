
export function getAuthData() {
    try {
        const rawAuthData = localStorage.getItem('vy-auth');
        if (rawAuthData) {
            const authData = JSON.parse(rawAuthData) as { username: string, user_id: string, token: string, clearance: number }
            return {
                username: authData.username,
                user_id: authData.user_id,
                clearance: authData.clearance,
                token: authData.token
            }
        }
    }
    catch (err) {
    }
    return;
}


export function setAuthData(data: {
    username: string,
    user_id: string;
    clearance: number,
    token: string
}) {
    localStorage.setItem('vy-auth', JSON.stringify({
        username: data.username,
        user_id: data.user_id,
        clearance: data.clearance,
        token: data.token
    }))
}
