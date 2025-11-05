import prisma from "../libs/prisma.js";

const getVariants = async (req, res) => {
  try {
    const variants = await prisma.variants.findMany();

    res.status(200).json({
      success: true,
      data: variants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createVariant = async (req, res) => {
  try {
    const { id, type, name, price_adjust } = req.body;

    if (
      id === null ||
      type === null ||
      name === null ||
      price_adjust === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu nhập đầy đủ type, name và price_adjust",
      });
    }

    const validateType = ["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"];
    if (!validateType.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type không hợp lệ",
      });
    }

    const existingVariant = await prisma.variants.findFirst({
      where: {
        id: id,
      },
    });
    if (existingVariant) {
      return res.status(400).json({
        success: false,
        message: "Variant đã tồn tại",
      });
    }

    const variant = await prisma.variants.create({
      data: {
        id,
        type,
        name,
        price_adjust,
      },
    });

    res.status(201).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const id = req.params.id;

    const variant = await prisma.variants.findUnique({
      where: {
        id: id,
      },
    });

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant không tồn tại",
      });
    }

    await prisma.variants.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      data: "Xóa variant thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getVariants, createVariant, deleteVariant };
