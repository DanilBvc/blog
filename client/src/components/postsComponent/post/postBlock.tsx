import { FC } from 'react';
import { postBlockProps } from './postBlock.type';
import './postBlock.scss';
import { getDateFrom } from '../../../utils/getDate';
import ExpandableText from '../../general/expandableText/expandableText';
import UserAvatar from '../../general/userAvatar/userAvatar';
import BlockWrapper from '../../general/blockWrapper/blockWrapper';
const PostBlock: FC<postBlockProps> = ({ author, title, text, tags, imageUrl }) => {
  return (
    <BlockWrapper additionalClass="post-block-wrapper">
      <div className="post-block-header">
        <UserAvatar />
        <div className="post-block-info">
          <div className="post-block-fullName">{author.fullName}</div>
          <div className="post-block-createdAt">{getDateFrom(author.createdAt)}</div>
        </div>
      </div>
      <div className="post-block-content">
        <div className="post-block-title">{title}</div>
        <div className="post-block-text">
          <ExpandableText text={text} length={100} />
        </div>
      </div>
      <div className="post-block-tags">
        {tags.map((tag) => (
          <span className="post-block-tag" key={tag}>
            #{tag}
          </span>
        ))}
      </div>
      {imageUrl && <img src={imageUrl} alt={title} />}
    </BlockWrapper>
  );
};
export default PostBlock;
