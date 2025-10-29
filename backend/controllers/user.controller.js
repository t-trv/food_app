import prisma from "../libs/prisma.js";
import checkRole from "../libs/checkRole.js";

const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id !== req.token_userId) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập user này",
      });
    }

    // Tìm user trong db
    const user = await prisma.users.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
      include: {
        addresses: true,
        user_role: {
          include: {
            roles: true,
          },
        },
      },
    });

    // Return nếu không có
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể tìm thấy user này",
    });
  }
};

const getUsers = async (req, res) => {
  const isAdmin = checkRole(req.token_userRoles, "admin");

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập danh sách user",
    });
  }

  try {
    const users = await prisma.users.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        addresses: true,
        user_role: {
          include: {
            roles: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id !== req.token_userId) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật user này",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    const { name, email, phone } = req.body;

    const updatedUser = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.token_userId !== id) {
      return res.status(500).json({
        success: false,
        message: "Bạn không phải chủ tài khoản này!",
      });
    }

    // Tìm user trong db
    const user = await prisma.users.findFirst({
      where: {
        id: parseInt(id),
        deleted_at: null,
      },
    });

    // Return nếu không có
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    // Xóa (soft delete) user
    await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deleted_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "User đã được xóa",
    });
  } catch (error) {
    console.log({
      success: false,
      message: error.message,
    });
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getUsers, getUser, deleteUser, updateUser };
