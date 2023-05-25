import { FC } from 'react';
import { postBlockProps } from './postBlock.type';
import './postBlock.scss';
import UserAvatar from '../general/userAvatar/userAvatar';
import { getDateFrom } from '../../utils/getDateFrom';
const PostBlock: FC<postBlockProps> = ({ author, title, text, tags, imageUrl }) => {
  return (
    <div className="post-block-wrapper">
      <div className="post-block-header">
        <UserAvatar />
        <div className="post-block-info">
          <div className="post-block-fullName">{author.fullName}</div>
          <div className="post-block-createdAt">{getDateFrom(author.createdAt)}</div>
        </div>
      </div>
      <div className="post-block-content">
        <div className="post-block-title">{title}</div>
        <div className="post-block-text">{text}</div>
      </div>
      <div className="post-block-tags">
        {tags.map((tag) => (
          <span className="post-block-tag" key={tag}>
            #{tag}
          </span>
        ))}
      </div>
      {imageUrl && <img src={imageUrl} alt={title} />}
    </div>
  );
};
export default PostBlock;
