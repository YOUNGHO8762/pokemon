import { useEffect } from 'react';
import { NavigationType } from 'react-router';
import router from '@/router/Router';

export const useNavigationCallback = (
  callback: () => void,
  navigationType?: NavigationType,
) => {
  useEffect(() => {
    const unsubscribe = router.subscribe(state => {
      if (!navigationType || state.historyAction === navigationType) {
        callback();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [callback, navigationType]);
};
