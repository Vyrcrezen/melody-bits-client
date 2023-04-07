import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { MusicCard } from "../../music/container/cardElement";

export function AboutSummary() {
    return (
        <div className="container d-flex justify-content-center mt-4 px-2 py-4 w-100 vy-primary-bg">
            <MusicCard musicData={{
                artist: {
                    id: -1,
                    name: 'Vyr'
                },
                avg_rating: 4,
                created_at: 'creation date',
                id: -1,
                is_favorite: true,
                link: 'www.melodybits.com/original/test',
                num_played: 6775,
                publisher: {
                    id: -1,
                    name: 'Vyr Originals',
                },
                ratings_num: 4,
                record_label: {
                    id: -1,
                    name: 'Vyr Originals',
                },
                tags: [{id: 1, name: 'edm'}, {id: 2, name: 'space'} ],
                title: 'Viruki',
                uploader: { user_id: '1', user_name: 'Vyr' },
                user_rating: 4
            }}  />
            <div className="w-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut nam quaerat adipisci asperiores quam corrupti ipsa maiores
                aperiam saepe dolores, officia obcaecati alias quasi eos autem error facilis accusantium ea non hic. Asperiores atque dolorum
                quibusdam. Ea dolore quam, sed sapiente consequuntur cupiditate similique in numquam, dolorum quibusdam incidunt.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut nam quaerat adipisci asperiores quam corrupti ipsa maiores
                aperiam saepe dolores, officia obcaecati alias quasi eos autem error facilis accusantium ea non hic. Asperiores atque dolorum
                quibusdam. Ea dolore quam, sed sapiente consequuntur cupiditate similique in numquam, dolorum quibusdam incidunt.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut nam quaerat adipisci asperiores quam corrupti ipsa maiores
                aperiam saepe dolores, officia obcaecati alias quasi eos autem error facilis accusantium ea non hic. Asperiores atque dolorum
                quibusdam. Ea dolore quam, sed sapiente consequuntur cupiditate similique in numquam, dolorum quibusdam incidunt.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut nam quaerat adipisci asperiores quam corrupti ipsa maiores
                aperiam saepe dolores, officia obcaecati alias quasi eos autem error facilis accusantium ea non hic. Asperiores atque dolorum
                quibusdam. Ea dolore quam, sed sapiente consequuntur cupiditate similique in numquam, dolorum quibusdam incidunt.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut nam quaerat adipisci asperiores quam corrupti ipsa maiores
                aperiam saepe dolores, officia obcaecati alias quasi eos autem error facilis accusantium ea non hic. Asperiores atque dolorum
                quibusdam. Ea dolore quam, sed sapiente consequuntur cupiditate similique in numquam, dolorum quibusdam incidunt.
            </div>
        </div>
    );
}