const isAdmin = (user) => {
  return user?.user_role?.some((role) => role.roles.id === "admin");
};

export default isAdmin;
