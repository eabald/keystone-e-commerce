import { list } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';

export const Address = list({
  fields: {
    addressName: text(),
    name: text({ validation: { isRequired: true } }),
    streetAddress: text({ validation: { isRequired: true } }),
    streetAddress2: text({ validation: { isRequired: true } }),
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
});
