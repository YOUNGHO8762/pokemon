import { useEffect } from 'react';
import { NavigationType } from 'react-router';
import router from '@/router/Router';

export const useNavigationCallback = (
  navigationType: NavigationType,
  callback: () => void,
) => {
  useEffect(() => {
    const unsubscribe = router.subscribe(state => {
      if (state.historyAction === navigationType) {
        callback();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [callback, navigationType]);
};
