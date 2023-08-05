import { io } from 'socket.io-client';
import { baseUrl } from './utils/network';

export const socket = io(baseUrl, {
  autoConnect: true,
});
