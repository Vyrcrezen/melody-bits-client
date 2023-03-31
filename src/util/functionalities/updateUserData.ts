import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../models/reqSuccessTypes";

interface updateSuccess extends MutationResponseType {
    code: 201;
};

export function updateUserData({authToken, username, email, oldPassword, newPassword, bio}: {authToken: string, username?: string, email?: string, oldPassword?: string, newPassword?: string, bio?: string}): Promise<updateSuccess> {
    const updateResult = new Promise<updateSuccess>((resolve, reject) => {
        fetch(`${EnvVariables.serverAddress}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql',
                'Authorization': `Bearer: ${authToken}`
            },
            body: `
                mutation {
                    editUserData(${username ? `user_name: "${username}", ` : ''}${email ? `user_email: "${email}", ` : ''}${newPassword ? `user_password: "${newPassword}", ` : ''}${bio ? `user_bio: "${bio}", ` : ''}) {
                    code
                    validationError {
                        target
                        path
                        value
                        message
                        messageCode
                    }
                    message
                    messageCode
                    }
                }
            `
        })
        .then((rawRes) => { return rawRes.json(); })
        .then(resTree => resTree.data.editUserData as MutationResponseType)
        .then((res) => {
            if (res.code === 201) {
                resolve({
                    code: res.code,
                    message: res.message,
                    messageCode: res.messageCode,
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

    return updateResult;
}
