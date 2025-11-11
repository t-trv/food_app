/**
 * Configuration cho Food Form
 * @param {Object} options - Options object
 * @param {Array} options.sideCategories - Array of side categories
 * @param {Array} options.variants - Array of variants (optional)
 * @returns {Object} Food form configuration
 */
export const getFoodFormConfig = ({ initialValues = {}, sideCategories = [], variants = [] }) => {
  return {
    // Initial values
    initialValues: initialValues ?? {
      name: "",
      slug: "",
      side_category_id: "",
      variant_id: [],
      preparation_time: "",
      description: "",
      price: "",
      discount: "",
      image: "",
    },

    // Field configurations
    fields: [
      {
        name: "name",
        label: "Tên món ăn",
        type: "text",
        required: true,
        placeholder: "Nhập tên món ăn",
      },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        placeholder: "nhap-mon-an",
      },
      {
        name: "side_category_id",
        label: "Danh mục phụ",
        type: "select",
        required: true,
        placeholder: "Chọn danh mục",
        colSpan: 2,
        options: sideCategories.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      },
      {
        name: "variant_id",
        label: "Kích cỡ",
        type: "multiselect",
        required: true,
        placeholder: "Chọn kích cỡ",
        colSpan: 2,
        options: variants.map((variant) => ({
          value: variant.id,
          label: variant.name,
        })),
      },
      {
        name: "preparation_time",
        label: "Thời gian làm (phút)",
        type: "number",
        required: true,
        placeholder: "30",
        colSpan: 2, // Render in 2-column grid
        props: {
          min: 0,
        },
      },
      {
        name: "price",
        label: "Giá tiền",
        type: "number",
        required: true,
        placeholder: "50000",
        colSpan: 2, // Render in 2-column grid
        props: {
          min: 0,
          step: 1000,
        },
      },
      {
        name: "discount",
        label: "Giá giảm",
        type: "number",
        required: false,
        placeholder: "0",
        props: {
          min: 0,
          step: 1000,
        },
      },
      {
        name: "image",
        label: "URL hình ảnh",
        type: "url",
        required: false,
        placeholder: "https://example.com/image.jpg",
      },
      {
        name: "description",
        label: "Mô tả",
        type: "textarea",
        required: true,
        placeholder: "Nhập mô tả món ăn",
      },
    ],

    // Validation function
    validate: (values) => {
      const errors = {};
      if (!values.name || values.name.trim() === "") {
        errors.name = "Tên món ăn là bắt buộc";
      }
      if (!values.slug || values.slug.trim() === "") {
        errors.slug = "Slug là bắt buộc";
      }
      if (!values.side_category_id || values.side_category_id.trim() === "") {
        errors.side_category_id = "Danh mục là bắt buộc";
      }
      if (!values.variant_id || !Array.isArray(values.variant_id) || values.variant_id.length === 0) {
        errors.variant_id = "Kích cỡ là bắt buộc";
      }
      if (!values.preparation_time || values.preparation_time === "") {
        errors.preparation_time = "Thời gian làm là bắt buộc";
      } else if (parseInt(values.preparation_time) < 0) {
        errors.preparation_time = "Thời gian làm phải lớn hơn hoặc bằng 0";
      }
      if (!values.description || values.description.trim() === "") {
        errors.description = "Mô tả là bắt buộc";
      }
      if (!values.price || values.price === "") {
        errors.price = "Giá tiền là bắt buộc";
      } else if (parseFloat(values.price) < 0) {
        errors.price = "Giá tiền phải lớn hơn hoặc bằng 0";
      }
      if (values.discount && parseFloat(values.discount) < 0) {
        errors.discount = "Giá giảm phải lớn hơn hoặc bằng 0";
      }
      if (values.image && values.image.trim() !== "") {
        try {
          new URL(values.image);
        } catch {
          errors.image = "URL hình ảnh không hợp lệ";
        }
      }
      return errors;
    },

    // Transform data before submit (optional)
    transformData: (values) => {
      return {
        ...values,
        preparation_time: parseInt(values.preparation_time),
        price: parseFloat(values.price),
        discount: values.discount ? parseFloat(values.discount) : 0,
      };
    },
  };
};
