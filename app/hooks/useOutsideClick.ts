import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
) {
  const ref = useRef<T>();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as T)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return { ref };
}
