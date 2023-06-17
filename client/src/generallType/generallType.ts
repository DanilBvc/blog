export type whoAmIResponseType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  chats: string[];
  __v?: number;
};

export type chatDataType = {
  _id: string;
  admin: string;
  user: string;
  messages: messageTypes[];
};

export enum requestOptions {
  ACCEPT = 'Accept',
  DECLINE = 'Decline',
}

export enum sortOptions {
  NEWEST = 'NEWEST',
}

export enum onlineStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

interface textMessage {
  messageType: string;
  sender: string;
  message: string;
}

export interface chatDataResponse {
  _id: string;
  admin: string;
  user: string;
  messages: (messageTypes & { _id: string; date: string })[];
}

interface modifiedMessage extends textMessage {
  pinned: boolean;
  edited: boolean;
}

interface messageReference extends textMessage {
  forwarded: {
    from: string | null;
    message: string | null;
  };
  replied: {
    toMessageId: string | null;
    message: string | null;
  };
}

interface videoMessage extends textMessage {
  videoUrl: string;
  videoDuration: number;
}

interface audioMessage extends textMessage {
  audioUrl: string;
  audioDuration: number;
}

export enum sendMessageTypes {
  TEXT_MESSAGE = 'TEXT',
  VIDEO_MESSAGE = 'VIDEO',
  AUDIO_MESSAGE = 'AUDIO',
  MODIFIED_MESSAGE = 'MODIFIED',
  REFERENCES_MESSAGE = 'REFERENCE',
}

export type SendMessagePayload = {
  [sendMessageTypes.TEXT_MESSAGE]: textMessage;
  [sendMessageTypes.VIDEO_MESSAGE]: videoMessage;
  [sendMessageTypes.AUDIO_MESSAGE]: audioMessage;
  [sendMessageTypes.MODIFIED_MESSAGE]: modifiedMessage;
  [sendMessageTypes.REFERENCES_MESSAGE]: messageReference;
};
export type messageTypes =
  | SendMessagePayload[sendMessageTypes.TEXT_MESSAGE]
  | SendMessagePayload[sendMessageTypes.AUDIO_MESSAGE]
  | SendMessagePayload[sendMessageTypes.VIDEO_MESSAGE]
  | SendMessagePayload[sendMessageTypes.MODIFIED_MESSAGE]
  | SendMessagePayload[sendMessageTypes.REFERENCES_MESSAGE];
