import { useEffect, useState } from "react";
import { Ploc } from "../../core/shared/presentation/ploc";

export function usePlocState<S>(ploc: Ploc<S>) {
  const [state, setState] = useState<S>(ploc.state());

  useEffect(() => {
    const stateSubscription = (state: S) => {
      setState(state);
    };

    ploc.subscribe(stateSubscription);

    return () => ploc.unsubscribe(stateSubscription);
  }, [ploc]);

  return state;
}
