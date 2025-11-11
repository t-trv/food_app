import CustomSelect from "../CustomSelect.jsx";
import CustomMultiSelect from "../CustomMultiSelect.jsx";

/**
 * Component để render form field từ config
 * @param {Object} props
 * @param {Object} props.field - Field configuration
 * @param {string} props.field.name - Field name
 * @param {string} props.field.label - Field label
 * @param {string} props.field.type - Field type (text, number, url, textarea, select, multiselect)
 * @param {boolean} props.field.required - Is field required
 * @param {string} props.field.placeholder - Placeholder text
 * @param {Object} props.field.props - Additional props for input
 * @param {Object} props.form - Form state from useModalForm
 */
const FormField = ({ field, form }) => {
  const { name, label, type = "text", required = false, placeholder = "", props: fieldProps = {} } = field;
  const hasError = form.errors[name];
  const value = form.formData[name] ?? (type === "multiselect" ? [] : "");

  const inputClassName = `border rounded-xl p-3 focus:outline-secondary bg-[#F7FBFF] text-sm ${
    hasError ? "border-primary" : "border-gray-300"
  }`;

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      value,
      onChange: form.handleInputChange,
      placeholder,
      className: inputClassName,
      ...fieldProps,
    };

    switch (type) {
      case "textarea":
        return <textarea rows="4" className={`${inputClassName} resize-none`} {...commonProps} />;
      case "select":
        return (
          <CustomSelect
            name={name}
            value={value}
            onChange={form.handleInputChange}
            options={field.options || []}
            placeholder={placeholder}
            hasError={hasError}
          />
        );
      case "multiselect":
        return (
          <CustomMultiSelect
            name={name}
            value={value}
            onChange={form.handleInputChange}
            options={field.options || []}
            placeholder={placeholder}
            hasError={hasError}
          />
        );
      default:
        return <input type={type} {...commonProps} />;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-secondary">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {renderInput()}
      {hasError && <span className="text-primary text-xs mt-1">{form.errors[name]}</span>}
    </div>
  );
};

export default FormField;
