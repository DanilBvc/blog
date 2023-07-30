import React, { useState } from 'react';
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
import { navData } from './navigation.options';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';

const Navigation = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  return (
    <BlockWrapper>
      <div className="navbar">
        <div className="navbar-wrapper">
          <div className="navbar-container">
            {navData.map((item, i) => (
              <NavigationItem
                key={i}
                text={item.name}
                menuItems={item.subitems}
                icon={item.icon}
                index={i + 1}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default Navigation;
