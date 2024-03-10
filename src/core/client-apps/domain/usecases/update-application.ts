import { ClientAppsRepository } from "../client-app-repository";

export type UpdateApplicationUseCase = ReturnType<typeof makeUpdateApplication>;

export function makeUpdateApplication(
  clientAppsRepository: ClientAppsRepository
) {
  return (input: { id: string; name: string; description: string }) =>
    clientAppsRepository.updateById(input.id, {
      name: input.name,
      description: input.description,
    });
}
