export enum RouteGuard {
  ANY,
  SALESPERSON,
  ACCOUNTANT,
  INVENTORY_MANAGER,
  SYSTEM_ADMINISTRATOR,
}

export const getRoleString = (role: RouteGuard) : string => {
  switch (role) {
    case RouteGuard.ANY: return "Basic User";
    case RouteGuard.SALESPERSON: return "Salesperson";
    case RouteGuard.ACCOUNTANT: return "Accountant";
    case RouteGuard.INVENTORY_MANAGER: return "Inventory Manager";
    case RouteGuard.SYSTEM_ADMINISTRATOR: return "System Administrator";
    default: return "Unknown Role";
  }
};
