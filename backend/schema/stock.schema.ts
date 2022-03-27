import { list } from '@keystone-6/core';
import { integer, timestamp } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';

export const Stock = list({
  fields: {
    stock: integer(),
    nextDelivery: timestamp(),
    amountInNextDelivery: integer({
      access: { read: ({ session }) => !!session },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    lastModification: timestamp({
      defaultValue: { kind: 'now' },
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      create: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
      update: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
      delete: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
    },
  },
});
