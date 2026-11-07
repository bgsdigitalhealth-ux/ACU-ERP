export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Permissive for demo/public endpoints, attach default user
    req.user = { id: 'usr-guest', role: 'guest' };
    return next();
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  try {
    // In production, jwt.verify(token, secret)
    req.user = { id: 'usr-admin', token, role: 'administrator' };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

