import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface Props {
  count: number;
  estimateSize: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  overscan?: number;
}

export const useInfiniteVirtualizer = <T extends HTMLElement>({
  count,
  estimateSize,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  overscan = 20,
}: Props) => {
  const ref = useRef<T>(null);

  const virtualizer = useVirtualizer({
    count,
    estimateSize: () => estimateSize,
    overscan,
    getScrollElement: () => ref.current,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= count - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    virtualizer.getVirtualItems(),
    count,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return {
    ref,
    virtualizer,
  };
};
