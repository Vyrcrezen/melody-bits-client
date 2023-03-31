import { ApprovalMusicCardData, MusicCardData } from "./musicCard";

export interface UserLoginType {
  code: number;
  message: string;
  messageCode: string;
  data: {
    token: string;
    user_name: string;
    user_id: string;
    clearance: number;
  };
}

export interface UserRegisterType {
  code: number;
  message: string;
  validationError: {
    target: string | null;
    path: string | null;
    value: string | null;
    message: string | null;
  };
}

export interface PublicUserDataType {
  code: number;
  message: string;
  data: {
    user_name: string,
      user_id: string,
      user_email: string,
      clearance: number,
      hashId: string,
      registration_time: string,
      last_online: string,
      uploads: string,
      favorites: string,
      comment_num: string,
      bio: string
  };
}

export interface MusicPaginationType {
  totalCount: number;
  offset: number;
  limit: number;
}

export interface MusicDataResponseType {
  code: number;
  message: string;
  messageCode: string;
  data?: {
    paginationData: MusicPaginationType,
    musicData: MusicCardData[]
  };
  validationError?: {
    target: string,
    path: string,
    value: string,
    message: string,
    messageCode: string
  }[]
}

export interface ApprovalMusicDataResponseType {
  code: number;
  message: string;
  messageCode: string;
  data?: {
    paginationData: MusicPaginationType,
    musicData: ApprovalMusicCardData[]
  };
  validationError?: {
    target: string,
    path: string,
    value: string,
    message: string,
    messageCode: string
  }[]
}

export interface MutationResponseType {
  code: number;
  message: string;
  messageCode: string;
  data?: string;
  validationError: {
    target: string,
    path: string,
    value: string,
    message: string,
    messageCode: string
  }[]
}

export interface BaseResponseTypes {
  code: number;
  message: string;
  messageCode?: string;
  validationError?: {
    target: string,
    path: string,
    value: string,
    message: string,
    messageCode: string
  }[]
}

export interface ResTagList extends BaseResponseTypes {
  data: {
    id: string,
    name: string
  }[]
}

