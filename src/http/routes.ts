import { FastifyInstance } from 'fastify';
import { usersRoutes } from './controllers/users/routes';
import { mealsRoutes } from './controllers/meals/routes';

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: '/users',
  });

  app.register(mealsRoutes, {
    prefix: '/meals',
  });
}
