import { makeRegisterMealUseCase } from '@/use-cases/factories/make-register-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const createBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    datetime: z.coerce.date().optional(),
    isDietMeal: z.boolean().optional(),
  });

  const { name, description, datetime, isDietMeal } = createBodySchema.parse(
    request.body,
  );

  const registerMealUseCase = makeRegisterMealUseCase();

  await registerMealUseCase.execute({
    name,
    description,
    datetime,
    isDietMeal,
    userId: sub,
  });

  return reply.status(201).send();
}
