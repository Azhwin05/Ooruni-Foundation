import { useEffect } from 'react';

const ContentProtector = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Prevent Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P
      if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'p', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
      // Prevent F12 (DevTools) - optional but requested often with this combo
      if (e.key === 'F12') {
         e.preventDefault();
         return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default ContentProtector;
