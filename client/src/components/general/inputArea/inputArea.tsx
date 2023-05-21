import { FC, useRef, useState } from 'react';
import './inputArea.scss';
import { InputAreaProps } from './inputArea.type';

const InputArea: FC<InputAreaProps> = ({ textHandler, value, placeholder }) => {
  const [minRows, setMinRows] = useState(3);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    textHandler(e.target.value);
    if (!textarea || !textarea.classList.contains('autoExpand')) return;

    const baseScrollHeight = parseInt(textarea.dataset.baseScrollHeight || '0');
    const rows = Math.ceil((textarea.scrollHeight - baseScrollHeight) / 16);
    setMinRows(minRows + rows);
  };
  return (
    <div className="inputArea-wrapper">
      <textarea
        className="autoExpand"
        rows={minRows}
        ref={textareaRef}
        value={value}
        data-min-rows="3"
        placeholder={placeholder}
        autoFocus
        onInput={handleTextareaInput}
      ></textarea>
    </div>
  );
};
export default InputArea;
