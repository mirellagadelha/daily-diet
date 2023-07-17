import { makeRetrieveUserMetricsUseCase } from '@/use-cases/factories/make-retrieve-user-metrics-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function retrieveUserMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub } = request.user;

  const retrieveUserMetricsUseCase = makeRetrieveUserMetricsUseCase();

  const { metrics } = await retrieveUserMetricsUseCase.execute({
    userId: sub,
  });

  return reply.status(200).send({ metrics });
}
