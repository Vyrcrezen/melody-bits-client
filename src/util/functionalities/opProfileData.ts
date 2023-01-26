import { EnvVariables } from "../../env";
import { PublicUserDataType } from "../../pages/login/reqSuccessTypes";

export interface ProfileData {
    username: string;
    user_id?: string;
    email?: string;
    clearance?: number;
    hashId?: string;
    registrationTime: string;
    lastOnline: string;
    uploads: string;
    favorites: string;
    comment_num: string;
    bio: string;
}

export interface ProfileResult {
    code: number;
    data: ProfileData;
}

export function getProfileData(profileId: string, authToken?: string): Promise<ProfileResult> {
  const loginResult = new Promise<ProfileResult>((resolve, reject) => {
    fetch(`${EnvVariables.serverAddress}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/graphql",
        'Authorization': `Bearer: ${authToken}`
      },
      body: `
            query {
                getUserData( user_id: "${profileId}" ) {
                  code
                  message
                  messageCode
                  data {
                    user_name
                    user_id
                    user_email
                    clearance
                    hashId
                    registration_time
                    last_online
                    uploads
                    favorites
                    comment_num
                    bio
                  }
                }
              }
            `,
    })
      .then((rawRes) => {
        return rawRes.json();
      })
      .then((resTree) => resTree.data.getUserData as PublicUserDataType)
      .then((res) => {
        if (res.code === 200) {
          resolve({
            code: res.code,
            data: {
                username: res.data.user_name,
                user_id: res.data.user_id,
                email: res.data.user_email,
                clearance: res.data.clearance,
                hashId: res.data.hashId,
                registrationTime: res.data.registration_time,
                lastOnline: res.data.last_online,
                uploads: res.data.uploads,
                favorites: res.data.favorites,
                comment_num: res.data.comment_num,
                bio: res.data.bio
            }
          });
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

  return loginResult;
}
