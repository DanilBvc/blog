import React from 'react';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import NavigationItem from './navigationItem/navigationItem';
import {
  homeIcon,
  humanIcon,
  imagePlaceholder,
  messageIcon,
  newsIcon,
  profileIcon,
  settingsIcon,
} from '../../../../assets/navigationIcons/navigationIcons';
import './navigation.scss';
const Navigation = () => {
  return (
    <BlockWrapper additionalClass="navigation-block-wrapper">
      <div className="navigation-wrapper">
        <NavigationItem title={'Home'} svg={homeIcon} path="/" />
        <NavigationItem title={'People'} svg={humanIcon} path="/people" />
        <NavigationItem title={'Messages'} svg={messageIcon} path="/message" />
        <NavigationItem title={'Photos'} svg={imagePlaceholder} path="/photos" />
        <NavigationItem title={'News Feed'} svg={newsIcon} path="/news" />
        <NavigationItem title={'Profile'} svg={profileIcon} path="/profile" />
        <NavigationItem title={'Settings'} svg={settingsIcon} path="/settings" />
      </div>
    </BlockWrapper>
  );
};

export default Navigation;
