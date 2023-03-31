import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../models/reqSuccessTypes";

type ApprovalStatusType = 'ok' | 'approve' | 'revision' | 'terminate';

interface updateSuccess extends MutationResponseType {
    code: 200;
};

export function updateMusicApproval({authToken, musicId, newStatus, message}: {authToken?: string, musicId: number, newStatus: ApprovalStatusType, message?: string}): Promise<updateSuccess> {

    const updateResult = new Promise<updateSuccess>((resolve, reject) => {
        if (authToken) {
            const statusCode = newStatus === 'ok' ? 0 : (newStatus === 'approve') ? 1 : (newStatus === 'revision') ? 2 : 3;

            fetch(`${EnvVariables.serverAddress}/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/graphql',
                    'Authorization': `Bearer: ${authToken}`
                },
                body: `
                        mutation {
                            editMusicApproval( musicId: ${musicId}, status: ${statusCode}, message: "${message}" ) {
                                code
                                data
                                message
                                messageCode
                            }
                        }
                    `
            })
            .then((rawRes) => { return rawRes.json(); })
            .then(resTree => resTree.data.editMusicApproval as MutationResponseType)
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
                message: "MD_308;You need to be logged in to approve a music."
            })
        }
    });

    return updateResult;
}
