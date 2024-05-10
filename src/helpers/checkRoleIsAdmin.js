const checkRoleIsAdmin = (role) => {
  if (!role?.length) return false;
  const mappingRole = role?.map((value) => {
    return Number(value);
  });
  const roleKodeSuperAdmin = Array.from({ length: 6 }, (_, i) => i + 1);
  const isAdmin = roleKodeSuperAdmin?.some((userRole) =>
    mappingRole?.includes(userRole)
  );

  return isAdmin;
};

export default checkRoleIsAdmin;
