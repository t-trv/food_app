import Modal from "../modal/Modal.jsx";
import Button from "../ui/Button.jsx";
import ButtonFilled from "../ui/ButtonFilled.jsx";
import FormField from "./FormField.jsx";

/**
 * Generic Admin Form Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close modal handler
 * @param {string} props.title - Modal title
 * @param {Array} props.fields - Array of field configurations
 * @param {Object} props.form - Form state from useModalForm
 * @param {string} props.width - Modal width
 * @param {Object} props.footer - Custom footer (optional)
 */
const AdminFormModal = ({ isOpen, onClose, title, fields, form, width = "600px", footer }) => {
  const defaultFooter = (
    <>
      <Button label="Hủy" onClick={onClose} disabled={form.isSubmitting} />
      <ButtonFilled
        label={form.isSubmitting ? "Đang lưu..." : "Lưu"}
        onClick={form.handleSubmit}
        disabled={form.isSubmitting}
      />
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width={width} footer={footer ?? defaultFooter}>
      <form onSubmit={form.handleSubmit} className="flex flex-col gap-4">
        {form.errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {form.errors.submit}
          </div>
        )}
        {(() => {
          const renderedFields = [];
          let i = 0;

          while (i < fields.length) {
            const currentField = fields[i];

            // If current field has colSpan 2, check if next field also has colSpan 2
            if (currentField.colSpan === 2) {
              const nextField = fields[i + 1];
              if (nextField && nextField.colSpan === 2) {
                // Render both fields in a 2-column grid
                renderedFields.push(
                  <div key={`${currentField.name}-${nextField.name}`} className="grid grid-cols-2 gap-4">
                    <FormField field={currentField} form={form} />
                    <FormField field={nextField} form={form} />
                  </div>
                );
                i += 2; // Skip both fields
              } else {
                // Single field with colSpan 2 (takes half width)
                renderedFields.push(
                  <div key={currentField.name} className="grid grid-cols-2 gap-4">
                    <FormField field={currentField} form={form} />
                  </div>
                );
                i += 1;
              }
            } else {
              // Regular full-width field
              renderedFields.push(<FormField key={currentField.name} field={currentField} form={form} />);
              i += 1;
            }
          }

          return renderedFields;
        })()}
      </form>
    </Modal>
  );
};

export default AdminFormModal;
