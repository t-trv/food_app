import Table from "../../components/table/Table.jsx";
import SecondaryTitle from "../../components/SecondaryTitle.jsx";
import dayjs from "dayjs";
import { useTableData } from "../../hooks/useTableData.js";

const AdminUsersPage = () => {
  const { data: users, isLoading, error } = useTableData("/users");

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên" },
    { key: "username", label: "Tên đăng nhập" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Số điện thoại" },
    {
      key: "roles",
      label: "Quyền",
      render: (item) => {
        return item.user_role?.flatMap((role) => role.roles.name).join(", ") || "Không có quyền";
      },
    },
    {
      key: "created_at",
      label: "Ngày tạo",
      render: (item) => dayjs(item.created_at).format("DD/MM/YYYY"),
    },
    {
      key: "deleted_at",
      label: "Ngày xóa",
      render: (item) => (item.deleted_at ? dayjs(item.deleted_at).format("DD/MM/YYYY") : ""),
    },
  ];

  return (
    <div>
      <SecondaryTitle title="Quản lý người dùng" />
      <br />
      <Table columns={columns} data={users} />
    </div>
  );
};

export default AdminUsersPage;
