import { Dispatch, SetStateAction } from 'react';

export type usersListProps = {
  setCurrentChatId: Dispatch<SetStateAction<string>>;
};
