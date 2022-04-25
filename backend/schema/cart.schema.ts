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
      ref: 'CartProduct',
      many: true,
      db: {
        foreignKey: true,
      },
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
  hooks: {
    resolveInput: async ({ resolvedData, context }) => {
      if (resolvedData?.products.connect.length) {
        const products = await context.query.CartProduct.findMany({
          where: {
            id: {
              in: resolvedData?.products.connect.map(
                (el: { id: string }) => el.id
              ),
            },
          },
          query: 'amount product { price }',
        });
        const sum = products.reduce((prev: number, current) => {
          const currentSum = current.product.price * current.amount;
          return prev + currentSum;
        }, 0);
        resolvedData.sum = sum;
      }
      return resolvedData;
    },
    beforeOperation: async ({ resolvedData, item, context }) => {
      if (resolvedData?.products) {
        const dbItems = await context.query.Cart.findOne({
          where: { id: item ? (item.id as string) : '' },
          query: 'products { id }',
        });
        if (dbItems.products.length) {
          await context.query.CartProduct.deleteMany({
            where: dbItems.products.map((el: { id: string }) => ({
              id: el.id,
            })),
          });
        }
      }
    },
  },
});
