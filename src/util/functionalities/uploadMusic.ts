import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../pages/login/reqSuccessTypes";

interface updateSuccess extends MutationResponseType {
    code: 201;
};

export function vyUploadMusic({authToken, formElement, postEdit = false, musicId}: {authToken: string, formElement: React.RefObject<HTMLFormElement>, postEdit?: boolean, musicId?: string}): Promise<updateSuccess> {

    console.log('Music upload function called...');

    const updateResult = new Promise<updateSuccess>((resolve, reject) => {
        
        if (formElement.current) {

            const data = new FormData(formElement.current);

            console.log('form data');
            console.log(data);
        
            fetch(`${EnvVariables.serverAddress}/music-data/${postEdit ? `edit/${musicId ?? -1}` : 'post-new'}`, {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                body: data
            })
                .then((response) => { return response.json(); })
                .then((result) => {

                    console.log(result);
                    if (result.code === 201) {
                        resolve(result)
                    }
                    else {
                        throw result;
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
        else {
            reject('MD_700;Form elment not found!')
        }
    });

    return updateResult;
}
