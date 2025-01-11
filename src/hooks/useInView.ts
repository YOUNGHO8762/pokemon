import { useEffect, useRef, useState } from 'react';

const useInView = <T extends Element>(
  options: IntersectionObserverInit = {}
) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const targetElement = ref.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

export default useInView;
