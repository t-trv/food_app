import prisma from "../libs/prisma.js";

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getRoles };
