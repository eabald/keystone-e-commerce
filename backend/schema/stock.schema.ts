import { list } from '@keystone-6/core';
import { integer, timestamp } from '@keystone-6/core/fields';

export const Stock = list({
  fields: {
    stock: integer(),
    nextDelivery: timestamp(),
    amountInNextDelivery: integer(),
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
});
