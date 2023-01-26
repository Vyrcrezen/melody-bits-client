import { validate } from "class-validator";
import { VblMusicTitle, VblMusicLink, VblMusicArtist, VblMusicAlbum, VblMusicRecordLabel, VblMusicPublisher, VblMusicTags, VblMusicImage, VblMusicAudio } from "../../models/validator/musicData";

export async function validateMusicTitle(title: string) {
    const vblMusicTitle = new VblMusicTitle(title);
    const validationResult = await validate(vblMusicTitle);
  
    return validationResult;
}

export async function validateMusicLink(link: string) {
    const vblMusicLink = new VblMusicLink(link);
    const validationResult = await validate(vblMusicLink);
  
    return validationResult;
}

export async function validateMusicArtist(arist: string) {
    const vblMusicArtist = new VblMusicArtist(arist);
    const validationResult = await validate(vblMusicArtist);
  
    return validationResult;
}

export async function validateMusicAlbum(album: string) {
    const vblMusicAlbum = new VblMusicAlbum(album || undefined);
    const validationResult = await validate(vblMusicAlbum);
  
    return validationResult;
}

export async function validateMusicRecordLabel(recordLabel: string) {
    const vblMusicRecordLabel = new VblMusicRecordLabel(recordLabel || undefined);
    const validationResult = await validate(vblMusicRecordLabel);
  
    return validationResult;
}

export async function validateMusicPublisher(publisher: string) {
    const vblMusicPublisher = new VblMusicPublisher(publisher || undefined);
    const validationResult = await validate(vblMusicPublisher);
  
    return validationResult;
}

export async function validateMusicTags(tagsString: string) {
    const tags = tagsString.split(';');

    const vblMusicTags = new VblMusicTags(tags);
    const validationResult = await validate(vblMusicTags);
  
    return validationResult;
}

export async function validateMusicImage(imageSrc: string) {
    const vblMusicImage = new VblMusicImage(imageSrc);
    const validationResult = await validate(vblMusicImage);
  
    return validationResult;
}

export async function validateMusicAudio(audioSrc: string) {
    const vblMusicAudio = new VblMusicAudio(audioSrc);
    const validationResult = await validate(vblMusicAudio);
  
    return validationResult;
}
