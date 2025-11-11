import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import SecondaryTitle from "../../components/SecondaryTitle";
import Loading from "../../components/Loading";
import Table from "../../components/table/Table";
import { useTableData } from "../../hooks/useTableData";
import TableSearch from "../../components/table/TableSearch";
import Button from "../../components/ui/Button";
import AdminFormModal from "../../components/admin/AdminFormModal";
import ConfirmModal from "../../components/ConfirmModal";
import Done from "../../components/animations/Done";
import { doneAnimation } from "../../assets/animations/index.js";

import useModalForm from "../../hooks/useModalForm";
import { getCategoryFormConfig } from "../../configs/categoryFormConfig";
import useMainCategories from "../../hooks/useMainCategories";
import apiRequest from "../../libs/apiRequest";

const AdminCategoriesPage = () => {
  const queryClient = useQueryClient();
  const {
    data: sideCategories = [],
    isLoading: isLoadingSideCategories,
    page,
    totalPages,
    setPage,
    handleSort,
    sortColumn,
    sortDirection,
    search,
    setSearch,
  } = useTableData("/categories/side");
  const [isDone, setIsDone] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });

  // Fetch data for form
  const { data: mainCategories = [], isLoading: isLoadingMainCategories } = useMainCategories();

  // Get form config with dynamic data
  const categoryFormConfig = getCategoryFormConfig({
    mainCategories,
  });

  // Create new category form
  const createForm = useModalForm({
    ...categoryFormConfig,
    onSubmit: async (formData, editingItem) => {
      const res = await apiRequest.post("/categories/side", formData);
      if (res.data.success) {
        queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
        return true;
      } else {
        return false;
      }
    },
    onSuccess: (data) => {
      setIsDone(true);
    },
  });

  // Edit category form
  const editForm = useModalForm({
    ...categoryFormConfig,
    onSubmit: async (formData, editingItem) => {
      // Note: Update API might not exist, using POST as fallback
      // If update API exists, change to: apiRequest.put(`/categories/side/${editingItem.id}`, formData)
      const res = await apiRequest.put(`/categories/side/${editingItem.id}`, formData);
      if (res.data.success) {
        queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
        return true;
      } else {
        return false;
      }
    },
    onSuccess: (data) => {
      setIsDone(true);
    },
  });

  const sideCategoriesColumns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "main_category_id",
      label: "Danh mục chính",
      sortable: true,
    },
    {
      key: "name",
      label: "Tên danh mục",
    },
    {
      key: "action",
      label: "Hành động",
      render: (item) => (
        <div className="flex justify-start items-center gap-2">
          <button className="text-secondary cursor-pointer" onClick={() => editForm.openEdit(item)}>
            Sửa
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-all duration-300 cursor-pointer"
            onClick={() => setDeleteModal({ isOpen: true, item })}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  if (isLoadingSideCategories || isLoadingMainCategories)
    return (
      <div className="flex justify-center items-center h-full relative">
        <Loading />
      </div>
    );

  return (
    <div className="relative h-full">
      <SecondaryTitle title="Quản lý danh mục phụ" />

      <div className="flex justify-end items-center gap-2 my-2">
        <TableSearch search={search} setSearch={setSearch} />
        <Button label="Thêm danh mục" onClick={createForm.openCreate} disabled={false} />
      </div>

      {/* Table */}
      <Table
        columns={sideCategoriesColumns}
        data={sideCategories}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        search={search}
        setSearch={setSearch}
      />

      {/* Modal thêm danh mục */}
      <AdminFormModal
        isOpen={createForm.isOpen}
        onClose={createForm.close}
        title="Thêm danh mục"
        fields={categoryFormConfig.fields}
        form={createForm}
      />

      {/* Modal sửa danh mục */}
      <AdminFormModal
        isOpen={editForm.isOpen}
        onClose={editForm.close}
        title="Sửa danh mục"
        fields={categoryFormConfig.fields}
        form={editForm}
      />

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Xác nhận xóa danh mục"
        desc={`Bạn có chắc chắn muốn xóa danh mục "${deleteModal.item?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={async () => {
          const res = await apiRequest.delete("/categories/side", {
            data: { id: deleteModal.item.id },
          });
          if (res.data.success) {
            queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
            setDeleteModal({ isOpen: false, item: null });
            setIsDone(true);
          } else {
            setDeleteModal({ isOpen: false, item: null });
          }
        }}
      />

      {isDone && (
        <Done
          title="Thao tác thành công! Đang tải lại dữ liệu..."
          animationData={doneAnimation}
          onComplete={() => {
            setIsDone(false);
            queryClient.invalidateQueries({ queryKey: ["/categories/side"] });
          }}
          autoHide={true}
          duration={2000}
        />
      )}
    </div>
  );
};

export default AdminCategoriesPage;
