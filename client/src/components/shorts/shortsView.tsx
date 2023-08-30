import React, { FC } from 'react';
import { shortsViewProps } from './shortsView.type';
import './shortsView.scss';
import ShortsViewItem from './shortsViewItem/shortsViewItem';
const ShortsView: FC<shortsViewProps> = ({ updateShorts, shorts }) => {
  return (
    <div className="shorts-wrapper">
      {shorts.map((video) => (
        <ShortsViewItem video={video} key={video._id} />
      ))}
    </div>
  );
};

export default ShortsView;
