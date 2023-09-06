import React, { useEffect, useState } from 'react';
import ChatBaseLayout from '../../../layouts/chatBaseLayout/chatBaseLayout';
import InputArea from '../../../components/general/inputArea/inputArea';
import './txtToImage.scss';
import { unauthorizedRequest } from '../../../utils/queries';
import { serviceTxtToImgUrl } from '../../../utils/services/googleCollabQueries';
import SubmitButton from '../../../components/general/submitButton/submitButton';
import { browseFile } from '../../../assets/generalIcons/modalsIcons';
import { getTextToImageModel } from '../../../utils/services/getTextToImageModel';
import InputRange from '../../../components/general/inputRange/inputRange';
import AiLoader from '../../../components/general/aiLoader/aiLoader';
import FormError from '../../../components/general/formError/formError';
const TxtToImage = () => {
  //data for model
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [cfg_scale, setCfgScale] = useState(7);
  const [steps, setSteps] = useState(50);
  const [batchSize, setBatchSize] = useState(1);
  const [batchCount, setBatchCount] = useState(1);
  //ui states
  const [loading, setLoading] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<null | number>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  //result
  const [resultImage, setResultImage] = useState<null | string | string[]>(null);
  const generatePicture = async () => {
    setLoading(true);
    try {
      const promptObject = getTextToImageModel(
        prompt,
        negativePrompt,
        width,
        height,
        steps,
        cfg_scale,
        batchCount,
        batchCount
      );
      const data = await unauthorizedRequest(serviceTxtToImgUrl, 'POST', promptObject);
      const result: {
        images: string[];
        info: string;
        parameters: {
          negative_prompt: string;
          prompt: string;
        };
      } = data;
      if (Array.isArray(result.images)) {
        setResultImage([...result.images.map((image) => `data:image/png;base64,${image}`)]);
      } else {
        setResultImage([`data:image/png;base64,${result.images}`]);
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  return (
    <ChatBaseLayout>
      <FormError appear={error} errorText={errorText} />
      <div className="text-to-image-wrapper">
        <div className="txt-wrapper">
          <div className="txt-prompt prompt-field">
            <InputArea
              textHandler={(prompt) => {
                setPrompt(prompt);
              }}
              value={prompt}
              placeholder={'Prompt'}
            />
          </div>
          <div className="txt-negative-prompt prompt-field">
            <InputArea
              textHandler={(prompt) => {
                setNegativePrompt(prompt);
              }}
              value={negativePrompt}
              placeholder={'Negative Prompt'}
            />
          </div>
        </div>
        <InputRange
          value={width}
          onChange={(value) => {
            setWidth(parseInt(value));
          }}
          placeHolder={'width'}
          min={64}
          max={2048}
        />
        <InputRange
          value={height}
          onChange={(value) => {
            setHeight(parseInt(value));
          }}
          placeHolder={'height'}
          min={64}
          max={2048}
        />
        <InputRange
          value={cfg_scale}
          onChange={(value) => {
            setCfgScale(parseInt(value));
          }}
          placeHolder={'cfg_scale'}
          min={1}
          max={30}
        />
        <InputRange
          value={cfg_scale}
          onChange={(value) => {
            setSteps(parseInt(value));
          }}
          placeHolder={'steps'}
          min={1}
          max={150}
        />
        <InputRange
          value={batchSize}
          onChange={(value) => {
            setBatchSize(parseInt(value));
          }}
          placeHolder={'batch size'}
          min={1}
          max={40}
        />
        <InputRange
          value={batchCount}
          onChange={(value) => {
            setBatchCount(parseInt(value));
          }}
          placeHolder={'batch count'}
          min={1}
          max={40}
        />
        <div className="txt-image-placeholder">
          <AiLoader loading={loading}>
            {resultImage ? (
              Array.isArray(resultImage) ? (
                <div className="txt-img-grid">
                  {resultImage.map((image) => (
                    <img className="decode-img" key={image} src={image} alt={prompt} />
                  ))}
                </div>
              ) : (
                <img className="decode-img" src={resultImage[0]} alt={prompt} />
              )
            ) : (
              browseFile
            )}
          </AiLoader>
        </div>
        {loading ? (
          'generation in progress'
        ) : (
          <SubmitButton text={'Generate'} onClick={generatePicture} />
        )}
      </div>
    </ChatBaseLayout>
  );
};

export default TxtToImage;
