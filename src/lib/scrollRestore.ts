export const saveScrollPosition = (key: string, scrollY: unknown): number => {
  if (typeof scrollY === 'number' && Number.isFinite(scrollY)) {
    sessionStorage.setItem(key, String(scrollY));
    return scrollY;
  }

  return 0;
};

export const getScrollPosition = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const clearScrollPosition = (key: string): void => {
  sessionStorage.removeItem(key);
};
