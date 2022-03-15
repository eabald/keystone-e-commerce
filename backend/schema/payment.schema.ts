import { list } from '@keystone-6/core';
import {
  decimal,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { PaymentStatusOptions } from '../consts/payment-status-options.const';

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
});
