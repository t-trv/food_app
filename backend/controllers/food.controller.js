import prisma from "../libs/prisma.js";

const getFood = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const food = await prisma.foods.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Món ăn không tồn tại",
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFoodBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const food = await prisma.foods.findFirst({
      where: { slug: slug, deleted_at: null },
      include: {
        food_variant: {
          include: {
            variants: true,
          },
        },
      },
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Món ăn không tồn tại",
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await prisma.foods.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        food_variant: {
          include: {
            variants: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createFood = async (req, res) => {
  try {
    const { side_category_id, name, slug, image, preparation_time, description, price, discount, variant_id } =
      req.body;

    if (
      side_category_id === null ||
      name === null ||
      slug === null ||
      preparation_time === null ||
      description === null ||
      price === null ||
      discount === null ||
      image === null ||
      image.trim() === "" ||
      !Array.isArray(variant_id) ||
      variant_id.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Yêu cầu nhập đầy đủ side_category_id, name, slug, preparation_time, description, price, discount, variant_id và image",
      });
    }

    const isSlugExist = await prisma.foods.findFirst({
      where: {
        slug: slug,
      },
    });
    if (isSlugExist) {
      return res.status(400).json({
        success: false,
        message: "Slug đã tồn tại, vui lòng nhập slug khác",
      });
    }

    if (image && image.trim() !== "") {
      try {
        new URL(image);
      } catch {
        return res.status(400).json({
          success: false,
          message: "URL hình ảnh không hợp lệ",
        });
      }
    }

    const existingSideCategory = await prisma.side_categories.findUnique({
      where: {
        id: side_category_id,
      },
    });
    if (!existingSideCategory) {
      return res.status(400).json({
        success: false,
        message: "Danh mục phụ không tồn tại, kiểm tra lại ở danh mục phụ",
      });
    }

    const food = await prisma.$transaction(async (tx) => {
      const createdFood = await tx.foods.create({
        data: { side_category_id, name, slug, image, preparation_time, description, price, discount },
      });

      await tx.food_variant.createMany({
        data: variant_id.map((variant) => ({ food_id: createdFood.id, variant_id: variant })),
      });

      return createdFood;
    });

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const food = await prisma.foods.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Món ăn không tồn tại",
      });
    }

    await prisma.foods.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });

    res.status(200).json({
      success: true,
      data: "Xóa món ăn thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { side_category_id, name, slug, image, preparation_time, description, price, discount, variant_id } =
      req.body;

    const food = await prisma.foods.findFirst({
      where: { id: id, deleted_at: null },
    });
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Món ăn không tồn tại",
      });
    }

    const updatedFood = await prisma.$transaction(async (tx) => {
      const updatedFood = await tx.foods.update({
        where: { id: id },
        data: { side_category_id, name, slug, image, preparation_time, description, price, discount },
      });

      await tx.food_variant.deleteMany({
        where: { food_id: id },
      });

      await tx.food_variant.createMany({
        data: variant_id.map((variant) => ({ food_id: id, variant_id: variant })),
      });

      return updatedFood;
    });

    res.status(200).json({
      success: true,
      data: updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// upper

const getFoodsByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const category = await prisma.main_categories.findFirst({
      where: {
        id: category_id,
      },
      include: {
        side_categories: {
          include: {
            foods: {
              where: {
                deleted_at: null,
              },
            },
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFoodsBySideCategory = async (req, res) => {
  try {
    const side_category_id = req.params.side_category_id;

    const foods = await prisma.foods.findMany({
      where: {
        side_category_id: side_category_id,
        deleted_at: null,
      },
    });

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getFood,
  getFoodBySlug,
  getFoods,
  createFood,
  deleteFood,
  updateFood,
  getFoodsByCategory,
  getFoodsBySideCategory,
};
