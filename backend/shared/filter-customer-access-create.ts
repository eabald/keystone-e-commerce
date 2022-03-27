import { Roles } from '../enums/roles.enum';

interface SessionObj {
  data: {
    role: Roles;
    id: string;
  };
}

export function filterCustomerAccessCreate(
  session: SessionObj,
  inputData: any
) {
  if (session.data.role !== Roles.Customer) {
    return true;
  }
  if (!inputData.user) {
    return false;
  }
  return (
    inputData.user.connect && inputData.user.connect.id === session.data.id
  );
}
