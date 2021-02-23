export enum Role {
  ANY,
  SALESPERSON,
  ACCOUNTANT,
  INVENTORY_MANAGER,
  SYSTEM_ADMINISTRATOR,
}

export const getRoleString = (role: Role) : string => {
  switch (role) {
    case Role.ANY: return "Basic User";
    case Role.SALESPERSON: return "Salesperson";
    case Role.ACCOUNTANT: return "Accountant";
    case Role.INVENTORY_MANAGER: return "Inventory Manager";
    case Role.SYSTEM_ADMINISTRATOR: return "System Administrator";
    default: return "Unknown Role";
  }
};
