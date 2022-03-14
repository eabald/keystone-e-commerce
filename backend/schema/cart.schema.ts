import { list } from '@keystone-6/core';
import { decimal, relationship, timestamp } from '@keystone-6/core/fields';

export const Cart = list({
  fields: {
    user: relationship({ ref: 'User' }),
    products: relationship({ ref: 'Product', many: true }),
    lastModified: timestamp({
      defaultValue: { kind: 'now' },
      db: {
        updatedAt: true,
      },
    }),
    sum: decimal({ validation: { isRequired: true } }),
  },
});
