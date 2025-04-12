import { Virtualizer } from '@tanstack/react-virtual';
import { useEffect } from 'react';

export const useRestoreVirtualScroll = <T extends HTMLElement>(
  virtualizer: Virtualizer<T, Element>,
  key: string,
) => {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(key);

    if (!savedPosition) {
      return;
    }

    (async () => {
      await virtualizer.scrollToOffset(Number(savedPosition));
      sessionStorage.removeItem(key);
    })();
  }, [virtualizer, key]);
};
