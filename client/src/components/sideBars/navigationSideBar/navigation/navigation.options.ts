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
];
