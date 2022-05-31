import { useEffect, useRef } from 'react';
import {env} from '@base/utils'

const DEFAULT_USE_TITLE_OPTIONS = {
  restoreOnUnmount: false,
};

function useTitle(title, options= DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef = useRef(document.title);

  if (document.title !== title) document.title = `${title} - ${env('NAME')}`;

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else {
      return;
    }
  }, []);
}

export default typeof document !== 'undefined' ? useTitle : (_title) => {};