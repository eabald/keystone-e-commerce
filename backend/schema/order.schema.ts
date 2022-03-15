import { list } from '@keystone-6/core';
import { json, relationship, select, timestamp } from '@keystone-6/core/fields';
import { OrderStatusOptions } from '../consts/order-status-options.const';

export const Order = list({
  fields: {
    user: relationship({ ref: 'User' }),
    products: json(),
    payment: relationship({ ref: 'Payment' }),
    shipment: relationship({ ref: 'Shipment' }),
    employee: relationship({ ref: 'User' }),
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
});
