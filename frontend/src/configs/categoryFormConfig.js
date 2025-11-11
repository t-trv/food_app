/**
 * Configuration cho Category Form
 * @param {Object} options - Options object
 * @param {Array} options.mainCategories - Array of main categories
 * @param {Object} options.initialValues - Initial values for the form
 * @returns {Object} Category form configuration
 */
export const getCategoryFormConfig = ({ initialValues = {}, mainCategories = [] }) => {
  return {
    // Initial values
    initialValues: initialValues ?? {
      id: "",
      main_category_id: "",
      name: "",
    },

    // Field configurations
    fields: [
      {
        name: "id",
        label: "Mã danh mục phụ",
        type: "text",
        required: true,
        placeholder: "VD: nuoc-ep ",
        colSpan: 2,
      },

      {
        name: "name",
        label: "Tên danh mục",
        type: "text",
        required: true,
        placeholder: "Tên hiển thị",
        colSpan: 2,
      },
      {
        name: "main_category_id",
        label: "Danh mục chính",
        type: "select",
        required: true,
        placeholder: "Nằm trong danh mục chính nào?",
        options: mainCategories.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      },
    ],

    // Validation function
    validate: (values) => {
      const errors = {};
      if (!values.id || values.id.trim() === "") {
        errors.id = "Mã danh mục là bắt buộc";
      }
      if (!values.main_category_id || values.main_category_id.trim() === "") {
        errors.main_category_id = "Danh mục chính là bắt buộc";
      }
      if (!values.name || values.name.trim() === "") {
        errors.name = "Tên danh mục là bắt buộc";
      }
      return errors;
    },

    // Transform data before submit (optional)
    transformData: (values) => {
      return {
        ...values,
      };
    },
  };
};
