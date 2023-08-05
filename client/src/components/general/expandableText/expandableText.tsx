import React, { FC, useState } from 'react';
import './expandableText.scss';
const ExpandableText: FC<{ text: string; length: number }> = ({ text, length }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {expanded ? (
        <div>{text}</div>
      ) : (
        <div className="expandableText">
          {text.slice(0, length)}
          <span onClick={toggleExpansion}>...</span>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
