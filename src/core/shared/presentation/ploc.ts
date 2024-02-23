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
      console.log(
        "🚀 ~ file: ploc.ts:32 ~ changeState ~ state:",
        internalState,
        "->",
        state
      );
      internalState = state;
      listeners.forEach((l) => l(state));
    },

    subscribe: (l) => {
      listeners.push(l);
      console.log(
        "(++) ~ file: ploc.ts:24 ~ ",
        internalState,
        listeners.length
      );
    },

    unsubscribe: (l) => {
      const index = listeners.indexOf(l);
      if (index > -1) listeners.splice(index, 1);
      console.log("(--) ~ file: ploc.ts:29 ~ ", internalState);
    },
  };
}
