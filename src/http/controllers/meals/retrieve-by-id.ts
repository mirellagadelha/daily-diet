import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeRetrieveMealUseCase } from '@/use-cases/factories/make-retrieve-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function retrieveById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub } = request.user;

  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(request.params);

  try {
    const retrieveMealUseCase = makeRetrieveMealUseCase();

    const { meal } = await retrieveMealUseCase.execute({
      mealId: id,
      userId: sub,
    });

    return reply.status(200).send({
      meal,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
