import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(request.params);

  try {
    const deleteMealUseCase = makeDeleteMealUseCase();

    await deleteMealUseCase.execute({
      mealId: id,
      userId: sub,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
