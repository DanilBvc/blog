import React, { FC, useEffect, useState } from 'react';
import './studioComponent.scss';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import StudioItem from './studioItem/studioItem';
import { studioComponentProps } from './studioComponent.type';
const StudioComponent: FC<studioComponentProps> = ({ addSelectedVideo, selectedVideos }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(''); //current url
  const studio = useAppSelector((state) => state.studioDataReducer);
  useEffect(() => {
    const match = location.pathname.match(/\/studio\/(.+)/);
    const result = match ? match[1] : '';
    setActiveCategory(result);
  }, [location.pathname]);

  return (
    <div className="studio-items">
      {studio.map((video) => (
        <StudioItem
          key={video._id}
          video={video}
          checkBoxEvent={addSelectedVideo}
          checkBoxes={selectedVideos}
        />
      ))}
    </div>
  );
};

export default StudioComponent;
