import { RegisterService } from "../auth-services";

export type RegisterUseCase = ReturnType<typeof makeRegisterUseCase>;

export function makeRegisterUseCase(registerService: RegisterService) {
  return (
    username: string,
    email: string,
    password: string
  ): ReturnType<RegisterService> => {
    return registerService(username, email, password);
  };
}
