import { makeFetchUserMealsUseCase } from '@/use-cases/factories/make-fetch-user-meals-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function fetchUserMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub } = request.user;

  const fetchUserMealsUseCase = makeFetchUserMealsUseCase();

  const { meals } = await fetchUserMealsUseCase.execute({
    userId: sub,
  });

  return reply.status(200).send({
    meals,
  });
}
