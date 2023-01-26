import { ArrayMinSize, IsOptional, IsUrl, Length, Matches } from "class-validator";

export class VblMusicTitle {
    @Length(2, 128, { message: "MD_001;Music title must be between 2 and 128 characters long." })
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

export class VblMusicLink {
    @IsUrl({}, { message: "MD_002;Link must be a valid web address, linking to the original source of the music." })
    link: string;

    constructor(link: string) {
        this.link = link;
    }
}

export class VblMusicArtist {
    @Length(2, 128, { message: "MD_003;Artist name must be between 2 and 128 characters long." })
    artist: string;

    constructor(artist: string) {
        this.artist = artist;
    }
}

export class VblMusicAlbum {
    @Length(2, 128, { message: "MD_004;Album name must be between 2 and 128 characters long." })
    @IsOptional()
    album?: string;

    constructor(album?: string) {
        this.album = album;
    }
}

export class VblMusicRecordLabel {
    @Length(2, 128, { message: "MD_005;Record Label name must be between 2 and 128 characters long." })
    @IsOptional()
    recordLabel?: string;

    constructor(recordLabel?: string) {
        this.recordLabel = recordLabel;
    }
}

export class VblMusicPublisher {
    @Length(2, 128, { message: "MD_006;Publisher name must be between 2 and 128 characters long." })
    @IsOptional()
    publisher?: string;

    constructor(publisher?: string) {
        this.publisher = publisher;
    }
}

export class VblMusicTags {
    @Length(2, 20, { each: true, message: "MD_007;Each tag must be between 2 and 20 characters long." })
    @ArrayMinSize(2, {message: "MD_008;Please provide at least 2 tags - separated by semicolon ( ; ) - that you think describe this music well."})
    tags: string[];

    constructor(tags: string[]) {
        this.tags = tags;
    }
}

export class VblMusicImage {
    @Matches(/(image\/jpg|image\/jpeg|image\/png|image\/webp)/, { message: "MD_009;Image must be in jpg, png or webp format." })
    imageSrc: string;

    constructor(imageSrc: string) {
        this.imageSrc = imageSrc;
    }
}

export class VblMusicAudio {
    @Matches(/audio\/mpeg/, { message: "MD_010;Music must be in mp3 format." })
    audioSrc: string;

    constructor(audioSrc: string) {
        this.audioSrc = audioSrc;
    }
}
