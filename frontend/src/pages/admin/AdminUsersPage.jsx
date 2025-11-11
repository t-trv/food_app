import Table from "../../components/table/Table.jsx";
import SecondaryTitle from "../../components/SecondaryTitle.jsx";
import dayjs from "dayjs";
import { useTableData } from "../../hooks/useTableData.js";
import Loading from "../../components/Loading";
import TableSearch from "../../components/table/TableSearch.jsx";

const AdminUsersPage = () => {
  const {
    data: users,
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
  } = useTableData("/users");

  const columns = [
    { key: "id", label: "ID", sortable: true },
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
      sortable: true,
    },
    {
      key: "deleted_at",
      label: "Ngày xóa",
      render: (item) => (item.deleted_at ? dayjs(item.deleted_at).format("DD/MM/YYYY") : ""),
      sortable: true,
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full relative">
        <Loading />
      </div>
    );

  return (
    <div>
      <SecondaryTitle title="Quản lý người dùng" />
      <div className="my-2">
        <TableSearch search={search} setSearch={setSearch} />
      </div>
      <Table
        columns={columns}
        data={users}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default AdminUsersPage;
