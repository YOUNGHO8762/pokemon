import { Virtualizer } from '@tanstack/react-virtual';
import { useEffect } from 'react';
import { clearScrollPosition, getScrollPosition } from '@/lib/scrollRestore';

export const useRestoreVirtualScroll = <T extends HTMLElement>(
  virtualizer: Virtualizer<T, Element>,
  key: string,
) => {
  useEffect(() => {
    const savedPosition = getScrollPosition(key);

    if (!savedPosition) {
      return;
    }

    (async () => {
      await virtualizer.scrollToOffset(Number(savedPosition));
      clearScrollPosition(key);
    })();
  }, [virtualizer, key]);
};
