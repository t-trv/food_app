const AdminUsersPage = () => {
  return (
    <div>
      Trang quản lý người dùng
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm max-w-2xl mx-auto mt-10">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 font-semibold">Tên món</th>
              <th className="p-3 font-semibold">Danh mục</th>
              <th className="p-3 font-semibold text-right">Giá</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="p-3">Cơm rang dưa bò</td>
              <td className="p-3">Món chính</td>
              <td className="p-3 text-right">45.000đ</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3">Bánh flan</td>
              <td className="p-3">Tráng miệng</td>
              <td className="p-3 text-right">20.000đ</td>
            </tr>
            <tr className="hover:bg-gray-50 hover:text-primary">
              <td className="p-3">Trà chanh</td>
              <td className="p-3">Đồ uống</td>
              <td className="p-3 text-right">15.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
