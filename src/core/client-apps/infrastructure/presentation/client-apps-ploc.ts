import { DataError } from "../../../shared/domain/data-error";
import PloC from "../../../shared/presentation/class-ploc";
import { ClientApp } from "../../domain/client-app";
import { FetchUserAppsUseCase } from "../../domain/usecases/fetch-user-apps";

export type AppsState =
  | { kind: "app:idle" }
  | { kind: "app:loading" }
  | { kind: "app:error"; errorMsg: string }
  | {
      kind: "app:success" | "app:reloading";
      apps: ClientApp[];
      selectedApp: string | null;
    };

export const appsInitialState: AppsState = { kind: "app:idle" };

export class ClientAppsPloC extends PloC<AppsState> {
  constructor(private fetchUserAppsUseCase: FetchUserAppsUseCase) {
    super(appsInitialState);
  }

  async fetchUserApps() {
    this.changeState({ kind: "app:loading" });

    try {
      await new Promise((res) => setTimeout(res, 1000));
      const apps = await this.fetchUserAppsUseCase().toPromise();
      this.changeState({ kind: "app:success", apps, selectedApp: null });
    } catch (err) {
      this.changeState({
        kind: "app:error",
        errorMsg: (err as DataError).error.message,
      });
    }
  }
}
