import { MusicDataResponseType } from "../pages/login/reqSuccessTypes";
import { DelayedActionAfterNoInput } from "../util/delayAfterNoInput";
import {
    ColumnOrderDirectionType,
    ColumnOrderNameType,
  getMusic,
  MusicRequestOptions,
} from "../util/functionalities/getMusic";

export class MusicFilterStates {
  filterOptions: MusicRequestOptions = {};
  musicListNeedsUpdate: boolean = false;
  delayHandler?: DelayedActionAfterNoInput;
  delayHandlerActive = false;

  delay: number;
  onNewMusicData: (musicResponse: MusicDataResponseType) => void;

  constructor(
    delay: number,
    onNewMusicData: (musicResponse: MusicDataResponseType) => void
  ) {
    this.delay = delay;
    this.onNewMusicData = onNewMusicData;
  }

  getFilteredMusic(authToken?: string) {
    return getMusic({ authToken: authToken, Options: this.filterOptions });
  }

  triggerFilteredRequest(authToken?: string) {
    if (!this.delayHandlerActive || !this.delayHandler) {
      this.delayHandlerActive = true;

      this.delayHandler = new DelayedActionAfterNoInput(this.delay, () => {
        this.getFilteredMusic(authToken)
          .then((result) => {
            this.delayHandlerActive = false;
            this.onNewMusicData(result);
          })
          .catch((err) => {
            this.delayHandlerActive = false;
            throw err;
          });
      });
    }
    this.delayHandler.regActionEvent();
  }

  setMusicTitle(musicTitle: string) {
    this.filterOptions.musicTitle = musicTitle;
    this.musicListNeedsUpdate = true;
  }

  setArtistName(artistName: string) {
    this.filterOptions.artistName = artistName;
    this.musicListNeedsUpdate = true;
  }

  setRecordLabelName(recordLabelName: string) {
    this.filterOptions.recordLabelName = recordLabelName;
    this.musicListNeedsUpdate = true;
  }

  setPublisherName(publisherName: string) {
    this.filterOptions.publisherName = publisherName;
    this.musicListNeedsUpdate = true;
  }

  setUploadDateMin(uploadDateMin: string) {
    this.filterOptions.uploadDateMin = uploadDateMin;
    this.musicListNeedsUpdate = true;
  }

  setUploadDateMax(uploadDateMax: string) {
    this.filterOptions.uploadDateMax = uploadDateMax;
    this.musicListNeedsUpdate = true;
  }

  setPlayedMin(playedMin: number) {
    this.filterOptions.playedMin = playedMin;
    this.musicListNeedsUpdate = true;
  }

  setPlayedMax(playedMax: number) {
    this.filterOptions.playedMax = playedMax;
    this.musicListNeedsUpdate = true;
  }

  setIsFavorite(isFavorite: boolean) {
    this.filterOptions.isFavorite = isFavorite;
    this.musicListNeedsUpdate = true;
  }

  setIsPendingApproval(isPendingApproval: boolean) {
    this.filterOptions.isPendingApproval = isPendingApproval;
    this.musicListNeedsUpdate = true;
  }

  setUploadName(uploaderName: string) {
    this.filterOptions.uploaderName = uploaderName;
    this.musicListNeedsUpdate = true;
  }

  setOrderBy({orderByColumn, orderByDirection}: {orderByColumn?: ColumnOrderNameType, orderByDirection?: ColumnOrderDirectionType}) {
    this.filterOptions.orderByColumn = orderByColumn;
    this.filterOptions.orderByDirection = orderByDirection;
    this.musicListNeedsUpdate = true;
  }

  setPageNum(pageNum: number) {
    this.filterOptions.pageNum = pageNum;
    this.musicListNeedsUpdate = true;
  }

  setTagValues(tagValues: { id?: string; name?: string }[]) {
    if (!this.filterOptions.tags) {
      this.filterOptions.tags = {};
    }

    this.filterOptions.tags.values = tagValues;
    this.musicListNeedsUpdate = true;
  }

  addTagValue(tagValue: { id?: string; name?: string }) {
    if (!this.filterOptions.tags) {
      this.filterOptions.tags = {};
    }

    if (!this.filterOptions.tags.values) {
      this.filterOptions.tags.values = [];
    }

    this.filterOptions.tags.values.push(tagValue);
    this.musicListNeedsUpdate = true;
  }

  removeTagValue(tagValue: { id?: string; name?: string }) {
    if (!this.filterOptions.tags) {
      this.filterOptions.tags = {};
    }

    if (!this.filterOptions.tags.values) {
      this.filterOptions.tags.values = [];
    }

    this.filterOptions.tags.values = this.filterOptions.tags.values.filter(
      (tag) => tag.id !== tagValue.id || tag.name !== tagValue.name
    );
    this.musicListNeedsUpdate = true;
  }

  toggleTagValue(tagValue: { id: string; name: string }) {
    if (
      this.filterOptions.tags?.values?.find(
        (item) => item.id === tagValue.id || item.name === tagValue.name
      )
    ) {
      this.removeTagValue(tagValue);
    } else {
      this.addTagValue(tagValue);
    }
  }

  getTagList() {
    if (
      this.filterOptions.tags?.values &&
      Array.isArray(this.filterOptions.tags?.values)
    ) {
      return this.filterOptions.tags.values;
    }

    const myEmptyReturnValue: NonNullable<
      MusicRequestOptions["tags"]
    >["values"] = [];
    return myEmptyReturnValue;
  }
}
