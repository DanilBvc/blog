import React from 'react';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import NavigationItem from './navigationItem/navigationItem';
import {
  homeIcon,
  humanIcon,
  imagePlaceholder,
  messageIcon,
  newsIcon,
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
        <NavigationItem title={'Shorts'} svg={imagePlaceholder} path="/shorts" />
        <NavigationItem title={'My studio'} svg={newsIcon} path="/studio/Video" />
        <NavigationItem title={'Settings'} svg={settingsIcon} path="/settings" />
      </div>
    </BlockWrapper>
  );
};

export default Navigation;
