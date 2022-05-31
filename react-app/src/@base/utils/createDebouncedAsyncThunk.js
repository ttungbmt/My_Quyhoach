import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * A debounced analogue of the `createAsyncThunk` from `@reduxjs/toolkit`
 * @param {string} typePrefix - a string action type value
 * @param payloadCreator - a callback function that should return a promise containing the result
 *   of some asynchronous logic
 * @param {number} wait - the number of milliseconds to delay.
 * @param {Object} [options] - the options object
 * @param {number} [options.maxWait = 0] - The maximum time `payloadCreator` is allowed to be
 * delayed before it's invoked.
 * @param {boolean} [options.leading = false] - Specify invoking on the leading edge of the timeout.
 */
const createDebouncedAsyncThunk = (typePrefix, payloadCreator, wait, options) => {
  const { maxWait = 0, leading = false } = options ?? {};
  let timer = 0;
  let maxTimer = 0;
  let resolve;
  const invoke = () => {
    clearTimeout(maxTimer);
    maxTimer = 0;
    if (resolve) {
      resolve(true);
      resolve = undefined;
    }
  };
  const cancel = () => {
    if (resolve) {
      resolve(false);
      resolve = undefined;
    }
  };
  return createAsyncThunk(typePrefix, payloadCreator, {
    condition() {
      const immediate = leading && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        invoke();
        timer = 0;
      }, wait);
      if (immediate) return true;
      cancel();
      if (maxWait && !maxTimer) maxTimer = setTimeout(invoke, maxWait);
      return new Promise(res => {
        resolve = res;
      });
    },
  });
};

export default createDebouncedAsyncThunk;