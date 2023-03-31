import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../models/reqSuccessTypes";


interface updateSuccess extends MutationResponseType {
    code: 200;
};

export function updateFavoriteMusic({authToken, musicId, isFavorite}: {authToken?: string, musicId: number, isFavorite: boolean}): Promise<updateSuccess> {

    const updateResult = new Promise<updateSuccess>((resolve, reject) => {
        if (authToken) {
            fetch(`${EnvVariables.serverAddress}/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/graphql',
                    'Authorization': `Bearer: ${authToken}`
                },
                body: `
                        mutation {
                            updateFavoriteMusic(musicId: ${musicId},  isFavorite: ${isFavorite}) {
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
            .then(resTree => resTree.data.updateFavoriteMusic as MutationResponseType)
            .then((res) => {
                if (res.code === 200) {
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
        }
        else {
            reject({
                message: "MD_303;You need to be logged in to favorite a music."
            })
        }
    });

    return updateResult;
}
