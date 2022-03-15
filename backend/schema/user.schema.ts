import { list } from '@keystone-6/core';
import { text, password, select, relationship } from '@keystone-6/core/fields';
import { RolesValues } from '../consts/roles.const';
import { Roles } from '../enums/roles.enum';

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    role: select({
      type: 'enum',
      options: RolesValues,
      defaultValue: Roles.Customer,
    }),
    address: relationship({ ref: 'Address', many: true }),
  },
});
