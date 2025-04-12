import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface Props {
  totalCount: number;
  itemHeight: number;
  overscan: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useInfiniteVirtualizer = <T extends HTMLElement>({
  totalCount,
  itemHeight,
  overscan,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const ref = useRef<T>(null);

  const virtualizer = useVirtualizer({
    count: totalCount,
    estimateSize: () => itemHeight,
    overscan,
    getScrollElement: () => ref.current,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= totalCount - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    virtualizer.getVirtualItems(),
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return {
    ref,
    virtualizer,
  };
};
