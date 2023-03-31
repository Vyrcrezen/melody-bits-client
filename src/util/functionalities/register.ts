import { EnvVariables } from "../../env";
import { UserRegisterType } from "../../models/reqSuccessTypes";

interface registerSuccess extends UserRegisterType {
    code: 201;
};

export function vyRegister(username: string, email: string, password: string): Promise<registerSuccess> {
    const registerResult = new Promise<registerSuccess>((resolve, reject) => {
        fetch(`${EnvVariables.serverAddress}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql',
            },
            body: `
                mutation {
                    registerUser (user_name: "${username}", user_email: "${email}", user_password: "${password}") {
                    code
                    message
                    validationError {
                        target
                        path
                        value
                        message
                    }
                    }
                }
            `
        })
        .then((rawRes) => { return rawRes.json(); })
        .then(resTree => resTree.data.registerUser as UserRegisterType)
        .then((res) => {
            if (res.code === 201) {
                resolve({
                    code: res.code,
                    message: res.message,
                    validationError: res.validationError
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

    return registerResult;
}
