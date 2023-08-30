import React, { FC, useMemo } from 'react';
import CheckBox from '../../general/checkBox/checkBox';
import { studioItemProps } from './studioItem.type';
import { getDateHoursMinute } from '../../../utils/getDate';
import './studioItem.scss';
import StudioVideoPreview from '../studioVideoPreview/studioVideoPreview';

const StudioItem: FC<studioItemProps> = ({ video, checkBoxEvent, checkBoxes }) => {
  const { like, dislike, _id, updatedAt, viewsCount, comments } = video;
  const likePercentage = useMemo(() => {
    const totalVotes = like + dislike;
    return totalVotes > 0 ? (like / totalVotes) * 100 : 0;
  }, [like, dislike]);
  const isCheckBoxActive = useMemo(() => {
    return checkBoxes.includes(_id as never);
  }, [checkBoxes, _id]);

  return (
    <div className="studio-item-wrapper">
      <CheckBox
        isChecked={isCheckBoxActive}
        setIsChecked={() => {
          checkBoxEvent(_id);
        }}
        label={''}
      />
      <div className="studio-item-preview">
        <StudioVideoPreview video={video} />
      </div>
      <div className="studio-item-date">{getDateHoursMinute(updatedAt)}</div>
      <div className="studio-item-views">{viewsCount}</div>
      <div className="studio-item-comments">{comments.commentsLength}</div>
      <div className="studio-item-like">{likePercentage}%</div>
    </div>
  );
};

export default StudioItem;
