import apiRequest from "../libs/apiRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const UpdateProfilePage = () => {
  const { updateUser, currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    apiRequest.post("/auth/logout").then((res) => {
      if (res.data.success) {
        updateUser(null);
        navigate("/");
      }
    });
  };

  return (
    <div className="h-full w-full bg-white rounded-2xl p-4">
      <p>Tên người dùng: {currentUser?.name}</p>
      <p>Tên đăng nhập: {currentUser?.username}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Số điện thoại: {currentUser?.phone}</p>
      <p>Địa chỉ: {currentUser?.address}</p>
      <p>Ngày sinh: {currentUser?.birthday}</p>
      <p>Giới tính: {currentUser?.gender}</p>
      <p>Vai trò: {currentUser?.user_role[0].roles.name}</p>
      <button
        onClick={handleLogout}
        className="bg-primary text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default UpdateProfilePage;
