import { Lists } from '.keystone/types';
import { User } from './user.schema';
import { Address } from './address.schema';
import { Cart } from './cart.schema';
import { CartProduct } from './cart-products.schema';
import { Order } from './order.schema';
import { Product } from './product.schema';
import { Stock } from './stock.schema';
import { Category } from './category.schema';
import { ProductImage } from './product-image.schema';
import { Payment } from './payment.schema';
import { Shipment } from './shipment.schema';

export const lists: Lists = {
  User,
  Address,
  Cart,
  CartProduct,
  Order,
  Product,
  Stock,
  Category,
  ProductImage,
  Payment,
  Shipment,
};
