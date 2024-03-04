import { useEffect, useRef } from "react";
import { ErrorAlert } from "../components/ErrorAlert";
import { useClientApps } from "../client-apps/use-client-apps";

export function CreateAppModal() {
  const { state, createApp } = useClientApps();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.kind == "app:success") {
      formRef.current?.reset();
      modalRef.current?.close();
    }
  }, [state.kind]);

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => modalRef.current?.showModal()}
      >
        create application
      </button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <br />

          <form
            ref={formRef}
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get("name") as string;
              const description = formData.get("description") as string;

              await createApp({ name, description });
            }}
          >
            <div className="mb-3 w-[80%] mx-auto">
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name..."
                  className="input input-sm input-bordered ml-2"
                />
              </label>
            </div>

            <div className="mb-3 w-[80%] mx-auto">
              <label htmlFor="desc" className="py-3">
                Description
                <input
                  id="desc"
                  name="description"
                  type="text"
                  placeholder="Description..."
                  className="input input-sm input-bordered ml-2"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-outline"
              disabled={
                state.kind == "app:loading" || state.kind == "app:reloading"
              }
            >
              Create app
            </button>
          </form>
          {state.kind == "app:error" && (
            <ErrorAlert errorMsg={state.errorMsg} />
          )}
        </div>
      </dialog>
    </>
  );
}
