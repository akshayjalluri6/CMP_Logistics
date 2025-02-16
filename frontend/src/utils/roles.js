// src/utils/roles.js
const roleHierarchy = {
    admin: 4,
    manager: 3,
    misInputsteam: 2,
    supervisor: 1,
  };
  
  const hasRole = (userRole, requiredRole) => {
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };
  
  export { roleHierarchy, hasRole };