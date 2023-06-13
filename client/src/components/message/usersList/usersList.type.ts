import { whoAmIResponseType } from './../../../generallType/generallType';
import { Dispatch, SetStateAction } from 'react';

export type usersListProps = {
  setCurrentChatId: Dispatch<SetStateAction<string>>;
  chatList: whoAmIResponseType[] | [];
  handleError: (error: boolean, errorText?: string) => void;
};
