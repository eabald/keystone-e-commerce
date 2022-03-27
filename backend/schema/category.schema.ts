import { list } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';

export const Category = list({
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    parent: relationship({ ref: 'Category' }),
    products: relationship({ ref: 'Product', many: true }),
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
