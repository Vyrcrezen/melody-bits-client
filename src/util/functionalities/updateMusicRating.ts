import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../pages/login/reqSuccessTypes";


interface updateSuccess extends MutationResponseType {
    code: 200;
};

export function updateMusicRating({authToken, musicId, ratingScore}: {authToken?: string, musicId: number, ratingScore: number}): Promise<updateSuccess> {

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
                        updateMusicRating(musicId: ${musicId},  ratingScore: ${ratingScore}) {
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
            .then(resTree => resTree.data.updateMusicRating as MutationResponseType)
            .then((res) => {
                console.log(res);
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
                message: "MD_306;You need to be logged in to rate a music."
            })
        }
    });

    return updateResult;
}
