import { EnvVariables } from "../../env";
import { MusicCardData } from "../../models/musicCard";
import { MusicDataResponseType, MutationResponseType } from "../../pages/login/reqSuccessTypes";


export function getNotApprovedMusic({authToken, musicId, status}: {authToken?: string, musicId: number, status: number[]}): Promise<MusicDataResponseType> {

    const updateResult = new Promise<MusicDataResponseType>((resolve, reject) => {
        if (authToken) {
            fetch(`${EnvVariables.serverAddress}/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/graphql',
                    'Authorization': `Bearer: ${authToken}`
                },
                body: `
                        query {
                            getMusicData( isPendingApproval:true, approvalStatusList: [${status.join(', ')}] ) {
                                code
                                message
                                data {
                                    paginationData {
                                      totalCount
                                      offset
                                      limit
                                    }
                                    musicData {
                                      id
                                      created_at
                                      uploader {
                                          user_id
                                          user_name
                                          registration_time
                                          last_online
                                      }
                                          updated_at
                                          editor {
                                          user_name
                                          registration_time
                                          last_online
                                      }
                                      title
                                      tags {
                                          id
                                          name
                                      }
                                      artist {
                                          id
                                          name
                                      }
                                      record_label {
                                          id
                                          name
                                      }
                                      publisher {
                                          id
                                          name
                                      }
                                      album
                                      link
                                      num_played
                                      avg_rating
                                      ratings_num
                                      user_rating
                                      aws_root
                                      music_size
                                      comments {
                                          user_name
                                          user_id
                                          commentText
                                          created_at
                                          updated_at
                                          deleted_at
                                      }
                                      is_favorite
                                    }
                                  }
                                }
                            }
                        
                    `
            })
            .then((rawRes) => { return rawRes.json(); })
            .then(resTree => resTree.data.getMusicData as MusicDataResponseType)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    resolve({
                        code: res.code,
                        message: res.message,
                        messageCode: res.messageCode,
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
        }
        else {
            reject({
                message: "MD_306;You need to be logged in to rate a music."
            })
        }
    });

    return updateResult;
}
