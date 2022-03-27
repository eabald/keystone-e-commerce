import { Roles } from '../enums/roles.enum';

interface SessionObj {
  data: {
    role: Roles;
    id: string;
  };
}

export function filterCustomerAccess(session: SessionObj) {
  if (session.data.role !== Roles.Customer) {
    return {};
  }
  return { user: { id: { equals: session.data.id } } };
}
