import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt.util.js";

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Validate input
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu nhập đầy đủ họ và tên, tên đăng nhập và mật khẩu",
      });
    }

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Tên đăng nhập đã tồn tại",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.users.create({
      data: {
        name,
        username,
        hash_password: hashedPassword,
      },
    });

    // Create user role
    await prisma.user_role.create({
      data: {
        user_id: user.id,
        role_id: 2, // 1 is admin, 2 is user
      },
    });

    const { hash_password, ...userWithoutPassword } = user;
    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu nhập đầy đủ tài khoản và mật khẩu",
      });
    }

    // Check user co ton tai khong
    const user = await prisma.users.findUnique({
      where: { username, deleted_at: null },
      include: {
        user_role: {
          include: {
            roles: true,
          },
        },
      },
    });

    // Return neu khong ton tai
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Tài khoản không tồn tại hoặc đã bị xóa",
      });
    }

    // Check password co dung khong
    const isPasswordValid = await bcrypt.compare(password, user.hash_password);

    // Return neu sai password
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Sai mật khẩu, vui lòng đăng nhập lại",
      });
    }

    // Tao token
    const token = generateAccessToken({
      id: user.id,
      roles: user.user_role,
    });

    // User without hashed password
    const { hash_password, ...userWithoutPassword } = user;

    // Return token
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 1,
      })
      .status(200)
      .json({
        success: true,
        data: userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { register, login, logout };
