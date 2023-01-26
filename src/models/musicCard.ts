
interface NameTable  {
    id: number;
    name: string;
}

export interface MusicCardData {
    id: number;
    uploader: { user_name: string, user_id: string };
    created_at: string;
    num_played: number;
    avg_rating: number;
    ratings_num: number;
    user_rating: number;

    link: string;

    title: string;
    album?: string;
    tags: NameTable[];

    artist: NameTable;
    record_label: NameTable;
    publisher: NameTable;

    is_favorite: boolean;  
}
