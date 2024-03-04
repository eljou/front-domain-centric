import { ClientAppsRepository } from "../client-app-repository";

export type CreateApplication = ReturnType<typeof makeCreateApplication>;

export function makeCreateApplication(
  clientAppsRepository: ClientAppsRepository
) {
  return (input: { name: string; description?: string }) =>
    clientAppsRepository.create({
      name: input.name,
      description: input.description || "No description",
    });
}
