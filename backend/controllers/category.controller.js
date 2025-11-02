import prisma from "../libs/prisma.js";

const getMainCategories = async (req, res) => {
  try {
    const mainCategories = await prisma.main_categories.findMany();
    res.status(200).json({
      success: true,
      data: mainCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSideCategories = async (req, res) => {
  try {
    const sideCategories = await prisma.side_categories.findMany();
    res.status(200).json({
      success: true,
      data: sideCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.main_categories.findMany({
      include: {
        side_categories: true,
      },
    });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createMainCategory = async (req, res) => {
  try {
    const { id, name, sort_order, path } = req.body;

    // Validate input
    if (!id || !name || !sort_order || !path) {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu nhập đầy đủ id, tên, thứ tự sắp xếp và đường dẫn",
      });
    }

    // Kiểm tra danh mục chính đã tồn tại
    const existingMainCategory = await prisma.main_categories.findUnique({
      where: { id },
    });
    if (existingMainCategory) {
      return res.status(400).json({
        success: false,
        message: "Mã danh mục chính đã tồn tại",
      });
    }

    // Kiểm tra tên sort_order đã tồn tại
    const existingSortOrder = await prisma.main_categories.findFirst({
      where: { sort_order },
    });
    if (existingSortOrder) {
      return res.status(400).json({
        success: false,
        message: "Thứ tự sắp xếp đã tồn tại",
      });
    }

    // Tạo danh mục chính
    const mainCategory = await prisma.main_categories.create({
      data: { id, name, sort_order, path },
    });
    res.status(201).json({
      success: true,
      data: mainCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMainCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const mainCategory = await prisma.main_categories.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      data: mainCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createSideCategory = async (req, res) => {
  try {
    const { name, slug, description, main_category_id } = req.body;

    // Validate input
    if (!name || !slug || !description || !main_category_id) {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu nhập đầy đủ tên, slug, mô tả và mã danh mục chính",
      });
    }

    // Kiểm tra danh mục phụ đã tồn tại
    const existingSideCategory = await prisma.side_categories.findFirst({
      where: { slug },
    });

    if (existingSideCategory) {
      return res.status(400).json({
        success: false,
        message: "Slug danh mục phụ đã tồn tại",
      });
    }

    // Kiểm tra danh mục chính đã tồn tại
    const existingMainCategory = await prisma.main_categories.findUnique({
      where: { id: main_category_id },
    });
    if (!existingMainCategory) {
      return res.status(400).json({
        success: false,
        message: "Danh mục chính không tồn tại",
      });
    }

    // Tạo danh mục phụ
    const sideCategory = await prisma.side_categories.create({
      data: { name, slug, description, main_category_id },
    });
    res.status(201).json({
      success: true,
      data: sideCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSideCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const sideCategory = await prisma.side_categories.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      data: sideCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getMainCategories,
  getSideCategories,
  getAllCategories,
  createMainCategory,
  deleteMainCategory,
  createSideCategory,
  deleteSideCategory,
};
