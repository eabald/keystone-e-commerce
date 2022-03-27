import { list } from '@keystone-6/core';
import {
  decimal,
  integer,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { Roles } from '../enums/roles.enum';

export const Product = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: document(),
    seoDesc: text({ ui: { displayMode: 'textarea' } }),
    categories: relationship({ ref: 'Category', many: true }),
    images: relationship({ ref: 'ProductImage', many: true }),
    price: decimal(),
    stars: integer(),
    stock: relationship({ ref: 'Stock' }),
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
