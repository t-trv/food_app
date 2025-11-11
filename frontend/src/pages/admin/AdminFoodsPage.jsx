import { Tag } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import Table from "../../components/table/Table.jsx";
import TableSearch from "../../components/table/TableSearch.jsx";
import Button from "../../components/ui/Button.jsx";
import SecondaryTitle from "../../components/SecondaryTitle.jsx";
import Loading from "../../components/Loading.jsx";
import AdminFormModal from "../../components/admin/AdminFormModal.jsx";

import { useTableData } from "../../hooks/useTableData.js";
import useModalForm from "../../hooks/useModalForm.js";
import { formatCurrency } from "../../libs/formatCurrency.js";
import { getFoodFormConfig } from "../../configs/foodFormConfig.js";
import apiRequest from "../../libs/apiRequest.js";
import useSideCategories from "../../hooks/useSideCategories.js";
import useVariants from "../../hooks/useVariants.js";
import Done from "../../components/animations/Done.jsx";
import { doneAnimation } from "../../assets/animations/index.js";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { useState } from "react";

const AdminFoodsPage = () => {
  const queryClient = useQueryClient();
  const {
    data: foods,
    isLoading,
    error,
    page,
    totalPages,
    setPage,
    handleSort,
    sortColumn,
    sortDirection,
    search,
    setSearch,
  } = useTableData("/foods", { limit: 5 });
  const [isDone, setIsDone] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });

  // Fetch data for form
  const { data: sideCategories = [], isLoading: isLoadingCategories } = useSideCategories();
  const { data: variants = [], isLoading: isLoadingVariants } = useVariants();

  // Get form config with dynamic data
  const foodFormConfig = getFoodFormConfig({
    sideCategories,
    variants,
  });

  // Transform food item from API format to form format
  const transformFoodForEdit = (item) => {
    return {
      ...item,
      variant_id: item.food_variant ? item.food_variant.map((fv) => fv.variant_id) : [],
    };
  };

  // Create new food form
  const createForm = useModalForm({
    ...foodFormConfig,
    onSubmit: async (formData, editingItem) => {
      const res = await apiRequest.post("/foods", formData);
      if (res.data.success) {
        queryClient.invalidateQueries({ queryKey: ["/foods"] });
        return true;
      } else {
        return false;
      }
    },
    onSuccess: (data) => {
      setIsDone(true);
    },
  });

  // edit food form
  const editForm = useModalForm({
    ...foodFormConfig,
    onSubmit: async (formData, editingItem) => {
      const res = await apiRequest.put(`/foods/${editingItem.id}`, formData);
      if (res.data.success) {
        queryClient.invalidateQueries({ queryKey: ["/foods"] });
        return true;
      } else {
        return false;
      }
    },
    onSuccess: (data) => {
      setIsDone(true);
    },
  });

  const columns = [
    { key: "id", label: "Id", sortable: true },
    {
      key: "image",
      label: "Hình ảnh",
      render: (item) => (
        <div
          style={{
            width: 60,
            height: 60,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        />
      ),
    },
    { key: "name", label: "Tên món ăn" },
    { key: "slug", label: "Slug" },
    { key: "side_category_id", label: "Danh mục" },
    { key: "preparation_time", label: "Thời gian làm" },
    { key: "price", label: "Giá tiền", render: (item) => formatCurrency(item.price), sortable: true },
    { key: "discount", label: "Giá giảm", render: (item) => formatCurrency(item.discount), sortable: true },
    {
      key: "is_active",
      label: "Trạng thái",
      render: (item) => {
        if (item.is_active) {
          return <Tag color="green">Đang hoạt động</Tag>;
        } else {
          return <Tag color="magenta">Dừng hoạt động</Tag>;
        }
      },
    },
    {
      key: "action",
      label: "Hành động",
      render: (item) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-secondary cursor-pointer"
            onClick={() => editForm.openEdit(transformFoodForEdit(item))}
          >
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

  if (isLoading || isLoadingCategories || isLoadingVariants)
    return (
      <div className="flex justify-center items-center h-full relative">
        <Loading />
      </div>
    );

  return (
    <div className="relative h-full">
      <SecondaryTitle title="Quản lý món ăn" />

      <div className="flex justify-end items-center gap-2 my-2">
        <TableSearch search={search} setSearch={setSearch} />
        <Button label="Thêm món ăn" onClick={createForm.openCreate} disabled={false} />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={foods}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        search={search}
        setSearch={setSearch}
      />

      {/* Modal thêm món ăn */}
      <AdminFormModal
        isOpen={createForm.isOpen}
        onClose={createForm.close}
        title="Thêm món ăn"
        fields={foodFormConfig.fields}
        form={createForm}
      />

      {/* Modal sửa món ăn */}
      <AdminFormModal
        isOpen={editForm.isOpen}
        onClose={editForm.close}
        title="Sửa món ăn"
        fields={foodFormConfig.fields}
        form={editForm}
      />

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Xác nhận xóa món ăn"
        desc={`Bạn có chắc chắn muốn xóa món ăn "${deleteModal.item?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={async () => {
          const res = await apiRequest.delete(`/foods/${deleteModal.item.id}`);
          if (res.data.success) {
            queryClient.invalidateQueries({ queryKey: ["/foods"] });
            setDeleteModal({ isOpen: false, item: null });
            setIsDone(true);
          }
          setDeleteModal({ isOpen: false, item: null });
        }}
      />

      {isDone && (
        <Done
          title="Thao tác thành công! Đang tải lại dữ liệu..."
          animationData={doneAnimation}
          onComplete={() => {
            setIsDone(false);
            queryClient.invalidateQueries({ queryKey: ["/foods"] });
          }}
          autoHide={true}
          duration={2000}
        />
      )}
    </div>
  );
};

export default AdminFoodsPage;
