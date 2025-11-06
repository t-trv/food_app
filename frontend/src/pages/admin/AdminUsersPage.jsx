import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import apiRequest from "../../libs/apiRequest";
import Table from "../../components/Table";
import SecondaryTitle from "../../components/SecondaryTitle";
import dayjs from "dayjs";

const AdminUsersPage = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await apiRequest.get("/users");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });

  if (isLoading) return <Loading />;
  if (error) {
    console.log(error);
    return <div>Đã xảy ra lỗi</div>;
  }

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
        return (
          item.user_role?.flatMap((role) => role.roles.name).join(", ") ||
          "Không có quyền"
        );
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
      render: (item) =>
        item.deleted_at ? dayjs(item.deleted_at).format("DD/MM/YYYY") : "",
    },
  ];
  const visibleData = users.reverse().slice(0, 10);

  return (
    <div>
      <SecondaryTitle title="Quản lý người dùng" />
      <br />
      <Table columns={columns} data={visibleData} />
    </div>
  );
};

export default AdminUsersPage;
