import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { updateById } from './update-by-id';
import { deleteById } from './delete-by-id';
import { fetchUserMeals } from './fetch-user-meals';
import { retrieveById } from './retrieve-by-id';

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJWT] }, fetchUserMeals);
  app.post('/', { onRequest: [verifyJWT] }, create);

  app.get('/:id', { onRequest: [verifyJWT] }, retrieveById);
  app.patch('/:id', { onRequest: [verifyJWT] }, updateById);
  app.delete('/:id', { onRequest: [verifyJWT] }, deleteById);
}
