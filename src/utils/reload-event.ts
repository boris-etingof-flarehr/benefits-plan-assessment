const eventName = crypto.randomUUID();

type UnsubscribeFunction = () => void;

const subscribe = (callback: () => void): UnsubscribeFunction => {
  window.addEventListener(eventName, callback);

  return () => window.removeEventListener(eventName, callback);
};

const dispatch = (): void => {
  window.dispatchEvent(new Event(eventName));
};

const reloadEvent = {
  subscribe,
  dispatch
};

export default reloadEvent;
