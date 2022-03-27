import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { Roles } from './enums/roles.enum';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url:
        process.env.DATABASE_URL ||
        'postgres://user:password@localhost/ecommerce',
      enableLogging: true,
      useMigrations: true,
    },
    ui: {
      isAccessAllowed: (context) =>
        context.session && context.session.data.role !== Roles.Customer,
    },
    server: {
      port: Number(process.env.BACKEND_PORT) || 5000,
    },
    lists,
    session,
  })
);
