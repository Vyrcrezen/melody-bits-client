import { EnvVariables } from "../../env";
import { ResTagList } from "../../models/reqSuccessTypes";

interface reqSuccessTagList extends ResTagList {
    code: 200;
};

export function getTagList(): Promise<reqSuccessTagList> {
    const registerResult = new Promise<reqSuccessTagList>((resolve, reject) => {
        fetch(`${EnvVariables.serverAddress}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql',
            },
            body: `
                    query {
                        getGlobalTagList {
                        code
                        data {
                            id
                            name
                        }
                        message
                        messageCode
                        }
                    }
                `
        })
        .then((rawRes) => { return rawRes.json(); })
        .then(resTree => resTree.data.getGlobalTagList as reqSuccessTagList)
        .then((res) => {
            if (res.code === 200) {
                resolve({
                    code: res.code,
                    message: res.message,
                    validationError: res.validationError,
                    data: res.data
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
