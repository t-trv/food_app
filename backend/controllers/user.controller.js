import prisma from "../libs/prisma.js";
import checkRole from "../libs/checkRole.js";
import * as addressService from "../services/address.service.js";

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
        hash_password: false,
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
    const { name, email, phone, address_line, city, district } = req.body;

    // Kiểm tra xem user có quyền cập nhật user này không
    if (id !== req.token_userId) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền cập nhật user này",
      });
    }

    // Tìm user trong db
    const user = await prisma.users.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });

    // Return nếu không tìm thấy user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    // Kiểm tra trùng email hoặc số điện thoại
    if (email && email !== user.email) {
      const existingEmail = await prisma.users.findFirst({
        where: {
          email: email,
          deleted_at: null,
          NOT: {
            id: id,
          },
        },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email đã tồn tại",
        });
      }
    }

    // Kiểm tra trùng số điện thoại
    if (phone && phone !== user.phone) {
      const existingPhone = await prisma.users.findFirst({
        where: {
          phone: phone,
          deleted_at: null,
          NOT: {
            id: id,
          },
        },
      });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: "Số điện thoại đã tồn tại",
        });
      }
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.users.update({
        where: {
          id: id,
        },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
        },
      });

      if (address_line || city || district) {
        const updatedAddress = await addressService.createAddress(
          { user_id: updatedUser.id, address_line, city, district },
          tx
        );
      }

      return updatedUser;
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
