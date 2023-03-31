import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { MusicCard } from '../components/music/container/cardElement';
import { MusicCardData } from '../models/musicCard';
import { Expand } from '../types/expandType';

type MusicOptions = {
    [prop: string]: any;
}

const graphqlQuery = `
getMusicData {
    data {
      id
      created_at
      uploader {
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
  }`

export  function initMusicDeck(hostId: string, _eventDescriptions: Array<{eventOriginId: string, eventType: keyof HTMLElementEventMap, musicOptions: Expand<MusicOptions>}>) {

    function Main() {
        const [musicDataSets, setMusicDataSets] = useState(new Array<MusicCardData>);
        const isInitialized = useRef(false);

        let musicDeck = new Array<JSX.Element>;

        if (!isInitialized.current) {

            fetch('/graphql', {
                body: graphqlQuery,
                headers: {
                    'Authorization': 'Brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2Njg5OTA0OTUsImV4cCI6MTY3MDIwMDA5NX0.EwklY3oo_600lEqyrrY1QJ0hZcG0dZTVP3W9KRr2XxQ'
                }
            })
                .then(res => res.json())
                .then(musicData => setMusicDataSets(musicData))
                .catch(err => console.log(err));

            // eventDescriptions.forEach(descriptor => {
            //     const domElement = document.getElementById(descriptor.eventOriginId);
            //     if (!domElement) { throw new Error(`Didn't find DOM element with id: ${descriptor.eventOriginId}`); }

            //     const queryParam = Object.keys(descriptor.musicOptions).reduce((queryAcc, optionName) => {

            //         if (descriptor.musicOptions[optionName]) {
            //             queryAcc.push(`${optionName}=${descriptor.musicOptions[optionName]}`);
            //         }

            //         return queryAcc;

            //     }, new Array<string>);

            //     console.log(queryParam);

            //     domElement.addEventListener(descriptor.eventType, () => {
            //         console.log(`${window.location.href.substring(0, window.location.href.indexOf('?'))}?${queryParam.join('&')}`);
            //         history.pushState({}, '', `${window.location.href.substring(0, window.location.href.indexOf('?'))}?${queryParam.join('&')}`);

            //         fetch(`/music/music-cards?${queryParam.join('&')}`)
            //         // fetch(`/music/music-cards?tagsAny=${['edm', 'dance'].join(',')}&artistAny=${['Phlex'].join(',')}`)
            //             .then(data => data.json())
            //             .then((data: MusicCardData[]) => {
            //                 console.log(data);
            //                 setMusicDataSets(data);
            //             })
            //             .catch(error => { throw error; });
            //     });
            // });

            isInitialized.current = true;
        }

        musicDataSets.forEach(data => {
            musicDeck.push(<MusicCard key={data.id} musicData={data} />);
        });

        return ( <>{musicDeck}</> );
    }

    const reactContainer = document.getElementById(hostId) as HTMLDivElement;
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<Main />);
}
