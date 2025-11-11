import prisma from "../libs/prisma.js";

export const createAddress = async (data, tx = prisma) => {
  try {
    const { user_id, address_line, city, district } = data;

    const createdAddress = await tx.addresses.create({
      data: {
        user_id,
        address_line,
        city,
        district,
      },
    });

    return createdAddress;
  } catch (error) {
    throw new Error(error.message);
  }
};
