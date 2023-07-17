import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { updateById } from './update-by-id';
import { fetchUserMeals } from './fetch-user-meals';
import { retrieveById } from './retrieve-by-id';
import { deleteById } from './delete-by-id';
import { retrieveUserMetrics } from './retrieve-user-metrics';

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/', create);
  app.patch('/:id', updateById);
  app.delete('/:id', deleteById);

  app.get('/', fetchUserMeals);
  app.get('/:id', retrieveById);
  app.get('/metrics', retrieveUserMetrics);
}
