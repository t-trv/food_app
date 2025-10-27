import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
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

    console.log(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Validate input
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username and password are required",
      });
    }

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
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

export { getUsers, createUser };
