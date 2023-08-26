import React, { useEffect, useState } from 'react';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import { unauthorizedRequest } from '../../utils/queries';
import { shortsUrl } from '../../utils/network';
import { videoResponse } from '../../generallType/generallType';
import ModalError from '../../components/general/modalError/modalError';
import Loading from '../../components/general/loading/loading';
import ShortsView from '../../components/shorts/shortsView';

const Shorts = () => {
  const [fromShorts, setFromShorts] = useState(0);
  const [toShorts, setToShorts] = useState(20);

  const [shorts, setShorts] = useState<videoResponse[]>([]);

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [loading, setLoading] = useState(false);

  const getShorts = async () => {
    setLoading(true);
    try {
      const data: videoResponse[] = await unauthorizedRequest(
        shortsUrl(fromShorts, toShorts),
        'GET'
      );
      console.log(data);
      setShorts((prev) => [...prev, ...Array.from(data)]);
      setFromShorts((prev) => prev + 20);
      setToShorts((prev) => prev + 20);
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    getShorts();
  }, []);

  return (
    <ChatBaseLayout>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />

      <Loading loading={loading}>
        <ShortsView updateShorts={getShorts} shorts={shorts} />
      </Loading>
    </ChatBaseLayout>
  );
};

export default Shorts;
