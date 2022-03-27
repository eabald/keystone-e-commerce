import { list } from '@keystone-6/core';
import { decimal, relationship, timestamp } from '@keystone-6/core/fields';
import { filterCustomerAccess, filterCustomerAccessCreate } from '../shared';

export const Cart = list({
  fields: {
    user: relationship({
      ref: 'User',
      ui: {
        hideCreate: true,
      },
    }),
    products: relationship({
      ref: 'Product',
      many: true,
      ui: { hideCreate: true },
    }),
    lastModified: timestamp({
      defaultValue: { kind: 'now' },
      db: {
        updatedAt: true,
      },
    }),
    sum: decimal({ validation: { isRequired: true }, defaultValue: '0' }),
  },
  access: {
    operation: {
      query: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => filterCustomerAccess(session),
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
  },
  graphql: {
    omit: ['create'],
  },
});
