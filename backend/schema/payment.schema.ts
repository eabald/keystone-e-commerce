import { list } from '@keystone-6/core';
import {
  decimal,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { PaymentStatusOptions } from '../consts/payment-status-options.const';
import { filterCustomerAccess, filterCustomerAccessCreate } from '../shared';

export const Payment = list({
  fields: {
    order: relationship({ ref: 'Order' }),
    sum: decimal(),
    currency: text(),
    externalId: text(),
    status: select({ type: 'enum', options: PaymentStatusOptions }),
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
