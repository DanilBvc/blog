import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: (callback: () => void) => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  const handleScroll = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const currentPosition = window.scrollY + window.innerHeight;
    if (currentPosition > contentHeight * 0.9 && !isFetching) {
      setIsFetching(true);
    } else {
      return;
    }
  };

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
