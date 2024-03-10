import { Navigate } from "react-router-dom";
import { Dispatch, ChangeEvent, useState, SetStateAction } from "react";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { usePlocState } from "../shared/use-ploc-state";
import { useSelectedClientApp } from "./use-selected-client-app";
import { ploc as appsPloc } from "./use-client-apps";

const updateAppPloc = dependenciesLocator.provideUpdateAppPloc(appsPloc);

export function ClientAppPage() {
  const state = usePlocState(updateAppPloc);
  const clientApp = useSelectedClientApp();
  const [name, setName] = useState(clientApp?.name ?? "");
  const [description, setDescription] = useState(clientApp?.description ?? "");

  const onChanger =
    (setter: Dispatch<SetStateAction<string>>) =>
    (ev: ChangeEvent<HTMLInputElement>) =>
      setter(ev.target.value);

  if (!clientApp) return <Navigate to="/" />;

  return (
    <div className="max-w-[90%] mx-auto">
      <h1 className="text-2xl mb-2 ml-20">Client App Page of</h1>
      <pre className="max-w-[66%] border border-solid mx-auto p-4 rounded-sm">
        {JSON.stringify({ ...clientApp }, null, 2)}
      </pre>
      <hr className="my-4" />
      <form
        className="flex flex-col gap-2 max-w-[50%] mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateAppPloc.updateApp(clientApp.id, { name, description });
        }}
      >
        <h2 className="text-xl">Update application</h2>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder="some name"
            value={name}
            onChange={onChanger(setName)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description
          <input
            type="text"
            className="grow"
            placeholder="Some description"
            value={description}
            onChange={onChanger(setDescription)}
          />
        </label>
        <button
          className="btn btn-info"
          type="submit"
          disabled={state.kind == "app:update:updating"}
        >
          Update
        </button>
        {state.kind}
      </form>
    </div>
  );
}
