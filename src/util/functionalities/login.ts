import { EnvVariables } from "../../env";
import { UserLoginType } from "../../pages/login/reqSuccessTypes";

interface loginSuccess {
    code: 200;
    username: string;
    user_id: string;
    clearance: number;
    token: string;
};

export function vyLogin(email: string, password: string): Promise<loginSuccess> {
    const loginResult = new Promise<loginSuccess>((resolve, reject) => {
        fetch(`${EnvVariables.serverAddress}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql',
            },
            body: `
                query {
                    authUser( email: "${email}", password: "${password}" ) {
                        code
                        message
                        data {
                            token
                            user_name
                            user_id
                            clearance
                        }
                    }
                }
            `
        })
        .then((rawRes) => { return rawRes.json(); })
        .then(resTree => resTree.data.authUser as UserLoginType)
        .then((res) => {
            if (res.code === 200) {
                resolve({
                    code: res.code,
                    username: res.data.user_name,
                    user_id: res.data.user_id,
                    clearance: res.data.clearance,
                    token: res.data.token
                });
            }
            else {
                reject(res);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

    return loginResult;
}
