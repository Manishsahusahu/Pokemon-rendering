const useDebounce = (callback, delay = 2000) => {
  let timerId;
  return (...args) => {
    console.log(...args);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounce;
