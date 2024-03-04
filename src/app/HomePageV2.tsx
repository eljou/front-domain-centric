import { useEffect, useMemo, useState } from "react";
import { dependenciesLocator } from "../core/shared/dependecies";
import PloC from "../core/shared/presentation/class-ploc";

function usePlocState<S>(ploc: PloC<S>) {
  const [state, setState] = useState<S>(ploc.state);

  useEffect(() => {
    const stateSubscription = (state: S) => {
      setState(state);
    };

    ploc.subscribe(stateSubscription);

    return () => ploc.unsubscribe(stateSubscription);
  }, [ploc]);

  return state;
}

function useClientApps() {
  const ploc = useMemo(() => dependenciesLocator.provideClientAppsPloc(), []);
  const state = usePlocState(ploc);

  return { state, fetchUserApps: ploc.fetchUserApps.bind(ploc) };
}

export function HomePage() {
  const { state, fetchUserApps } = useClientApps();
  console.log("🚀 ~ HomePage ~ state:", state);

  const handleClick = async () => {
    await fetchUserApps("alksdjfa");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button onClick={handleClick} className="btn btn-primary">
            get apps
          </button>
          <hr className="my-4" />
          <p>{state.kind}</p>
        </div>
      </div>
    </div>
  );
}
