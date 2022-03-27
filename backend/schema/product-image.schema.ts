import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { Roles } from '../enums/roles.enum';

export const ProductImage = list({
  fields: {
    alt: text({ validation: { isRequired: true } }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? 'do2s70i8u',
        apiKey: process.env.CLOUDINARY_API_KEY ?? '774697418362449',
        apiSecret:
          process.env.CLOUDINARY_API_SECRET ?? 'QmAussSge1GGrVtGvtxOT5qrtYI',
        folder: process.env.CLOUDINARY_API_FOLDER ?? 'product-images',
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
