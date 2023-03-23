import { EnvVariables } from "../../env";
import { ApprovalMusicDataResponseType} from "../../pages/login/reqSuccessTypes";


export function getSubmittedMusic({authToken, userId, status}: {authToken?: string, userId?: string, status?: number[]}): Promise<ApprovalMusicDataResponseType> {

    const updateResult = new Promise<ApprovalMusicDataResponseType>((resolve, reject) => {
        if (authToken && userId) {
            fetch(`${EnvVariables.serverAddress}/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/graphql',
                    'Authorization': `Bearer: ${authToken}`
                },
                body: `
                        query {
                            getMusicData( isPendingApproval:true, uploaderId: ${userId} ) {
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
                                      approval {
                                        approval_time
                                        message
                                        status
                                      }
                                    }
                                  }
                                }
                            }
                        
                    `
            })
            .then((rawRes) => { return rawRes.json(); })
            .then(resTree => resTree.data.getMusicData as ApprovalMusicDataResponseType)
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
