import { EnvVariables } from "../../env";
import { MusicCardData } from "../../models/musicCard";
import { MusicDataResponseType } from "../../models/reqSuccessTypes";

export type ColumnOrderNameType =
  | "title"
  | "avg_rating"
  | "created_at"
  | "num_played"
  | "uploader_name";
export type ColumnOrderDirectionType = "ASC" | "DESC";

export interface MusicRequestOptions {
  musicId?: string;
  musicTitle?: string;
  artistName?: string;
  recordLabelName?: string;
  publisherName?: string;
  uploaderName?: string;
  tags?: {
    values?: { id: number; name: string }[];
    Options?: { relAnd: boolean };
  };
  limit?: number;
  uploadDateMin?: string;
  uploadDateMax?: string;
  playedMin?: number;
  playedMax?: number;
  isFavorite?: boolean;
  isPendingApproval?: boolean;
  orderByColumn?: ColumnOrderNameType;
  orderByDirection?: ColumnOrderDirectionType;
  pageNum?: number;
}

export function getMusic({
  authToken,
  Options,
}: {
  authToken?: string;
  Options?: MusicRequestOptions;
}): Promise<MusicDataResponseType> {
  let musicFilters: string[] = [];
  if (Options?.musicId) {
    musicFilters.push(`musicId: "${Options.musicId}"`);
  }
  if (Options?.musicTitle) {
    musicFilters.push(`musicTitle: "${Options.musicTitle}"`);
  }
  if (Options?.artistName) {
    musicFilters.push(`artistName: "${Options.artistName}"`);
  }
  if (Options?.recordLabelName) {
    musicFilters.push(`recordLabelName: "${Options.recordLabelName}"`);
  }
  if (Options?.publisherName) {
    musicFilters.push(`publisherName: "${Options.publisherName}"`);
  }
  if (Options?.uploaderName) {
    musicFilters.push(`uploaderName: "${Options.uploaderName}"`);
  }
  if (Options?.uploadDateMin) {
    musicFilters.push(`uploadDateMin: "${Options.uploadDateMin}"`);
  }
  if (Options?.uploadDateMax) {
    musicFilters.push(`uploadDateMax: "${Options.uploadDateMax}"`);
  }
  if (Options?.playedMin) {
    musicFilters.push(`playedMin: "${Options.playedMin}"`);
  }
  if (Options?.playedMax) {
    musicFilters.push(`playedMax: "${Options.playedMax}"`);
  }
  if (Options?.limit) {
    musicFilters.push(`limit: ${Options.limit}`);
  }
  if (Options?.isFavorite) {
    musicFilters.push(`isFavorite: "${Options.isFavorite}"`);
  }
  if (Options?.isPendingApproval) {
    musicFilters.push(`isPendingApproval: "${Options.isPendingApproval}"`);
  }
  if (Options?.orderByColumn) {
    musicFilters.push(`orderByColumn: "${Options.orderByColumn}"`);
  }
  if (Options?.orderByDirection) {
    musicFilters.push(`orderByDirection: "${Options.orderByDirection}"`);
  }

  if (Options?.pageNum) {
    musicFilters.push(`pageNum: ${Options.pageNum}`);
  }
  if (Options?.tags?.values && Options?.tags?.values.length > 0) {
    musicFilters.push(
      `tags: { values: [${Options.tags.values
        .map((item) => `"${item.name}"`)
        .join(",")}] }, `
    );
  }

  const updateResult = new Promise<MusicDataResponseType>((resolve, reject) => {
    fetch(`${EnvVariables.serverAddress}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/graphql",
        Authorization: `Bearer: ${authToken}`,
      },
      body: `
              query {
                getMusicData ${
                  musicFilters.length > 0 ? `(${musicFilters.join(", ")})` : ""
                }
                {
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
                
            `,
    })
      .then((rawRes) => {
        return rawRes.json();
      })
      .then((resTree) => resTree.data.getMusicData as MusicDataResponseType)
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          resolve({
            code: res.code,
            message: res.message,
            messageCode: res.messageCode,
            validationError: res.validationError,
            data: res.data,
          });
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

  return updateResult;
}
