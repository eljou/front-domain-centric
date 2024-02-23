import { PostsRepository } from "../post-repository";

export type GetPostsByUserUseCase = ReturnType<typeof makeGetPostsByUser>;

export function makeGetPostsByUser(postsRepository: PostsRepository) {
  return (userId: number) => postsRepository.getByUserId(userId);
}
