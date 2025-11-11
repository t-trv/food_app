import { useState, useCallback } from "react";

/**
 * Custom hook để quản lý modal form state và logic
 * @param {Object} config - Configuration object
 * @param {Object} config.initialValues - Giá trị ban đầu của form
 * @param {Function} config.validate - Function validation
 * @param {Function} config.onSubmit - Function được gọi khi submit, nhận formData và editingItem
 * @param {Function} config.onSuccess - Callback khi submit thành công
 * @param {Function} config.transformData - Function để transform data trước khi submit
 * @returns {Object} Modal form utilities
 */
const useModalForm = (config) => {
  const { initialValues = {}, validate, onSubmit, onSuccess, transformData } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    if (!validate) return true;
    const newErrors = validate(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validate]);

  // Reset form
  const reset = useCallback(
    (newValues = null) => {
      const resetValues = newValues ?? initialValues;
      setFormData(resetValues);
      setErrors({});
      setEditingItem(null);
    },
    [initialValues]
  );

  // Handle form submit
  const handleSubmit = useCallback(
    async (e) => {
      if (e) {
        e.preventDefault();
      }

      if (!validateForm()) return;

      if (!onSubmit) {
        console.warn("onSubmit function is required");
        return;
      }

      setIsSubmitting(true);
      try {
        // Transform data if transformData function is provided
        const dataToSubmit = transformData ? transformData(formData) : formData;

        // Call user's onSubmit function with formData and editingItem
        const result = await onSubmit(dataToSubmit, editingItem);

        // If onSubmit returns success or truthy value, close modal and reset
        if (result !== false) {
          setIsOpen(false);
          reset();
          if (onSuccess) {
            onSuccess(result);
          }
        }
      } catch (error) {
        if (error.response?.data?.message) {
          setErrors({ submit: error.response.data.message });
        } else if (error.message) {
          setErrors({ submit: error.message });
        } else {
          setErrors({ submit: "Có lỗi xảy ra khi thực hiện thao tác" });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, editingItem, onSuccess, transformData, reset]
  );

  // Open modal for create
  const openCreate = useCallback(() => {
    reset();
    setIsOpen(true);
  }, [reset]);

  // Open modal for edit
  const openEdit = useCallback((item) => {
    setEditingItem(item);
    setFormData(item);
    setErrors({});
    setIsOpen(true);
  }, []);

  // Close modal
  const close = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  return {
    isOpen,
    formData,
    errors,
    isSubmitting,
    editingItem,
    handleInputChange,
    handleSubmit,
    openCreate,
    openEdit,
    close,
    reset,
  };
};

export default useModalForm;
