import { EnvVariables } from "../env";

 interface getMusicArgs {
  isPending?: boolean;
  musicTitle?: string;
  tags?: { name: string }[];
 }

export class MusicBrowserQs {

    static async queryServer<T>(queryString: string, authToken?: string): Promise<T | undefined> {

      return new Promise((resolve, reject) => {
        let funcName = (queryString.match(/(?<={(\s)*)[a-zA-Z]+/g) ?? [])[0];

        console.log('Resolved query function name:');
        console.log(funcName);

        if (typeof funcName !== 'string') {
          reject(new Error('Coulnd\'t resolve query function name!'));
        }

        fetch(`${EnvVariables.serverAddress}/graphql`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/graphql',
              "Authorization": `Bearer ${authToken}`
          },
          body: queryString
          })
          .then(response => response.json())
          .then(rawData => (funcName ? rawData.data[funcName]: {}).data as T |  undefined)
          .then((data) => {
            console.log('resolving now');
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
              reject(err);
          });
      });
    }

    static tagsQuery = `
    query {
        getGlobalTagList {
            code
            message
            data {
                id
                name
            }
        }
    }
    `;

    static getFavoriteMusicQuery(musicId: string, isFavorite: boolean) {
      return `
        mutation {
          ${isFavorite ? 'addFavoriteMusic' : 'removeFavoriteMusic' } (musicId: ${musicId}) {
            code
            message
            validationError {
              target
              path
              value
              message
            }
          }
        }
      `
    }

    static getMusicQuery(Options?: getMusicArgs) {
      const queryArg = [];

      if (Options?.isPending) queryArg.push('isPendingApproval: true');
      if (Options?.musicTitle) queryArg.push(`musicTitle: "${Options.musicTitle}"`);
      if (Options?.tags && Options.tags.length > 0) {
        queryArg.push(`tags: { values: ${ JSON.stringify(Options.tags.map(tag => tag.name)) } }`);
      }

        return `
        query {
            getMusicData${queryArg.length > 0 ? `(${queryArg.join(', ')})` : ''} {
              code
              message
              data {
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
        `
    }
}
