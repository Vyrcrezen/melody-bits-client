import { EnvVariables } from "../../env";
import { MutationResponseType } from "../../models/reqSuccessTypes";

interface deleteSuccess extends MutationResponseType {
  code: 200;
}

export function deleteMusic({
  authToken,
  musicId,
}: {
  authToken?: string;
  musicId: number;
}): Promise<deleteSuccess> {
  const deleteResult = new Promise<deleteSuccess>((resolve, reject) => {
    fetch(`${EnvVariables.serverAddress}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/graphql",
        Authorization: `Bearer: ${authToken}`,
      },
      body: `
            mutation {
                deleteMusic(musicId: ${musicId}) {
                  code
                  message
                  messageCode
                }
              }
            `,
    })
      .then((rawRes) => {
        return rawRes.json();
      })
      .then((resTree) => resTree.data.deleteMusic as MutationResponseType)
      .then((res) => {
        if (res.code === 200) {
          resolve({
            code: res.code,
            message: res.message,
            messageCode: res.messageCode,
            validationError: res.validationError,
          });
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

  return deleteResult;
}
