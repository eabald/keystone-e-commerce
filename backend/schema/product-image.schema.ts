import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { Roles } from '../enums/roles.enum';

export const ProductImage = list({
  fields: {
    alt: text({ validation: { isRequired: true } }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
        apiKey: process.env.CLOUDINARY_API_KEY ?? '',
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
        folder: process.env.CLOUDINARY_API_FOLDER ?? '',
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
      create: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
      update: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
      delete: ({ session }) =>
        !!session && session.data.role !== Roles.Customer,
    },
  },
});
