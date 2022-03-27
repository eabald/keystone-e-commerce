import { list } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';
import { filterCustomerAccess, filterCustomerAccessCreate } from '../shared';

export const Address = list({
  fields: {
    addressName: text(),
    name: text({ validation: { isRequired: true } }),
    streetAddress: text({ validation: { isRequired: true } }),
    streetAddress2: text(),
    city: text({ validation: { isRequired: true } }),
    postalCode: text({ validation: { isRequired: true } }),
    country: text({ validation: { isRequired: true } }),
    telNo: text({ validation: { isRequired: true } }),
    user: relationship({
      ref: 'User',
      ui: {
        hideCreate: true,
      },
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
