import { list } from '@keystone-6/core';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { ShipmentStatusOptions } from '../consts/shipment-status-options.const';

export const Shipment = list({
  fields: {
    status: select({ type: 'enum', options: ShipmentStatusOptions }),
    externalId: text(),
    order: relationship({ ref: 'Order' }),
    employee: relationship({ ref: 'User' }),
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
