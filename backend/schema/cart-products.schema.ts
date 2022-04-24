import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';

export const CartProduct = list({
  fields: {
    product: relationship({ ref: 'Product' }),
    amount: integer({ defaultValue: 0, validation: { isRequired: true } }),
  },
  hooks: {
    validateInput: async ({ resolvedData, context, addValidationError }) => {
      const id = resolvedData.product.connect.id;
      const productStocks = await context.query.Product.findOne({
        where: { id },
        query: 'stock { stock amountInNextDelivery }',
      });
      if (
        resolvedData.amount >
        productStocks.stock.stock + productStocks.stock.amountInNextDelivery
      ) {
        addValidationError('Not enough in stock.');
      }
    },
  },
});
