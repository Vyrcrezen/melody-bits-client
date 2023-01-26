import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../pages/login/reqSuccessTypes";

interface updateSuccess extends MutationResponseType {
    code: 200;
};

export function increaseMusicPlayed({musicId, authToken}: {musicId: number, authToken?: string}): Promise<updateSuccess> {
    const updateResult = new Promise<updateSuccess>((resolve, reject) => {
        fetch(`${EnvVariables.serverAddress}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql',
                'Authorization': `Bearer: ${authToken}`
            },
            body: `
                mutation {
                    increaseMusicPlayed( musicId: ${musicId} ) {
                        code
                        data
                        messageCode
                        message
                    }
                }
            `
        })
        .then((rawRes) => { return rawRes.json(); })
        .then(resTree => resTree.data.increaseMusicPlayed as MutationResponseType)
        .then((res) => {
            if (res.code === 200) {
                resolve({
                    code: res.code,
                    data: res?.data,
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
