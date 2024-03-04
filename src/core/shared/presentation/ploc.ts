type Subscription<S> = (state: S) => void;

export type Ploc<S> = {
  state: () => S;
  changeState: (state: S) => void;
  subscribe: (listener: Subscription<S>) => void;
  unsubscribe: (listener: Subscription<S>) => void;
};

export function makePloc<S>(initialState: S): Ploc<S> {
  let internalState: S = initialState;
  const listeners: Subscription<S>[] = [];

  return {
    state: () => internalState,

    changeState: (state) => {
      console.group(" <:> change state: ");
      console.log(internalState, "->", state);
      console.groupEnd();
      internalState = state;
      listeners.forEach((l) => l(state));
    },

    subscribe: (l) => {
      listeners.push(l);
    },

    unsubscribe: (l) => {
      const index = listeners.indexOf(l);
      if (index > -1) listeners.splice(index, 1);
    },
  };
}
