const checkRoleIsAdmin = (role) => {
  if (!role?.length) return false;
  const mappingRole = role?.map((value) => {
    return Number(value);
  });
  const roleAdmin = [1, 2, 6];
  const isAdmin = roleAdmin?.some((userRole) =>
    mappingRole?.includes(userRole)
  );

  return isAdmin;
};

export default checkRoleIsAdmin;
