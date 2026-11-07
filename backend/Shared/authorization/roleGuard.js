export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.length) return next();
    const userRole = req.user?.role || req.headers['x-user-role'];
    if (allowedRoles.includes(userRole) || userRole === 'admin' || userRole === 'chancellor') {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: `Access forbidden: requires one of [${allowedRoles.join(', ')}]`,
    });
  };
};
export default requireRole;

