import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateById(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(request.params);

  const updateBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    datetime: z.coerce.date().optional(),
    isDietMeal: z.boolean().optional(),
  });

  const { name, description, datetime, isDietMeal } = updateBodySchema.parse(
    request.body,
  );

  try {
    const updateMealUseCase = makeUpdateMealUseCase();

    const { meal } = await updateMealUseCase.execute({
      mealId: id,
      userId: sub,
      name,
      description,
      datetime,
      isDietMeal,
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
