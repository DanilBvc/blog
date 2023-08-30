import { aiIcon, aiImageIcon, aiTextIcon } from '../../../../assets/generalIcons/aiIcons';
import {
  employee,
  searchWorker,
  hierarchy,
  project,
  pipeline,
  tasks,
  purchase,
  providers,
  order,
} from '../../../../assets/global';

export const navData = [
  {
    name: 'Social',
    url: '/',
    icon: employee,
    subitems: [
      {
        name: 'People',
        url: '/people',
        icon: searchWorker,
      },
      {
        name: 'Messages',
        url: '/message',
        icon: hierarchy,
      },
    ],
  },
  {
    name: 'Feed',
    url: '/',
    icon: project,
    subitems: [
      {
        name: 'News feed',
        url: '/',
        icon: pipeline,
      },
      {
        name: 'Shorts',
        url: '/shorts',
        icon: tasks,
      },
    ],
  },
  {
    name: 'Private',
    url: '/',
    icon: purchase,
    subitems: [
      {
        name: 'My studio',
        url: '/studio/Video',
        icon: providers,
      },
      {
        name: 'Settings',
        url: '/settings',
        icon: order,
      },
    ],
  },
  {
    name: 'Ai',
    url: '/',
    icon: aiIcon,
    subitems: [
      {
        name: 'Text to image',
        url: '/txt-to-image',
        icon: aiTextIcon,
      },
      {
        name: 'Image to image',
        url: '/image-to-image  ',
        icon: aiImageIcon,
      },
    ],
  },
];
