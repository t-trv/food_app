const checkRole = (roles, requiredRole) => {
  const isHasRole =
    roles.filter((role) => role.roles.name === requiredRole).length > 0;

  return isHasRole;
};

export default checkRole;
