const checkRole = (roles, requiredRole) => {
  const isHasRole =
    roles.filter((role) => role.roles.id === requiredRole).length > 0;

  return isHasRole;
};

export default checkRole;
