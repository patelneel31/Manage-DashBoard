const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res.status(401).json({ message: "Unauthorized. User is not an admin  found." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
