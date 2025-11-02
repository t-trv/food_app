import checkRole from "../libs/checkRole.js";

const isAdmin = (req, res, next) => {
  const isAdmin = checkRole(req.token_userRoles, "admin");

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập tính năng này",
    });
  }

  next();
};

export default isAdmin;
