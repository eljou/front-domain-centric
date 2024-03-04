import { useEffect } from "react";
import { Ploc } from "../../core/shared/presentation/ploc";

export const useZustandPlocState = <S>(
  ploc: Ploc<S>,
  usePlocStore: () => { state: S; setState: (newState: S) => void }
) => {
  const { state, setState } = usePlocStore();

  useEffect(() => {
    const updateState = (st: S) => setState(st);

    ploc.subscribe(updateState);
    return () => ploc.unsubscribe(updateState);
  }, [ploc, setState]);

  return state;
};
