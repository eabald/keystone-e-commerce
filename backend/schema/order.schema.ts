import { list } from '@keystone-6/core';
import { json, relationship, select, timestamp } from '@keystone-6/core/fields';
import { OrderStatusOptions } from '../consts/order-status-options.const';
import { filterCustomerAccess, filterCustomerAccessCreate } from '../shared';

export const Order = list({
  fields: {
    user: relationship({
      ref: 'User',
      ui: {
        hideCreate: true,
      },
    }),
    products: json(),
    payment: relationship({ ref: 'Payment' }),
    shipment: relationship({ ref: 'Shipment' }),
    employee: relationship({
      ref: 'User',
      ui: {
        hideCreate: true,
      },
    }),
    status: select({ type: 'enum', options: OrderStatusOptions }),
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
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
    filter: {
      query: ({ session }) => filterCustomerAccess(session),
      update: ({ session }) => filterCustomerAccess(session),
      delete: ({ session }) => filterCustomerAccess(session),
    },
    item: {
      create: ({ session, inputData }) =>
        filterCustomerAccessCreate(session, inputData),
    },
  },
});
