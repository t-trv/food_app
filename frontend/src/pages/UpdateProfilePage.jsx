import apiRequest from "../libs/apiRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { avtDefault } from "../assets/avt";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";

const UpdateProfilePage = () => {
  const { updateUser, currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const formFields = [
    {
      label: "Tên người dùng",
      type: "text",
      id: "name",
      name: "name",
      placeholder: "Nguyễn Văn A",
      pattern: "^[a-zA-ZÀ-ỹ\\s]{3,30}$",
      minLength: 3,
      maxLength: 30,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      name: "email",
      placeholder: "example@example.com",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    {
      label: "Số điện thoại",
      type: "text",
      id: "phone",
      name: "phone",
      placeholder: "0909090909",
      pattern: "^0[0-9]{9}$",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser.id;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      setIsLoading(true);
      const res = await apiRequest.put(`/users/${userId}`, data);
      if (res.data.success) {
        updateUser(res.data.data);

        setTimeout(() => {
          setIsLoading(false);
          toast.success("Cập nhật thành công");
          e.target.reset();
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error(res.data.message);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    apiRequest.post("/auth/logout").then((res) => {
      if (res.data.success) {
        updateUser(null);
        navigate("/");
      }
    });
  };

  const handleDeleteAccount = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const handleConfirmDeleteAccount = () => {
    setIsDeleteAccountModalOpen(false);
    apiRequest.delete(`/users/${currentUser.id}`).then((res) => {
      if (res.data.success) {
        updateUser(null);
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="h-full w-full bg-white rounded-2xl p-8 relative">
        <>
          {/* section 1 */}
          <div className="flex items-center justify-between">
            {/* left */}
            <div className="flex items-center gap-4">
              <div className="lg:w-25 lg:h-25 w-20 h-20 rounded-full overflow-hidden border border-secondary">
                <img src={currentUser?.avatar || avtDefault} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl lg:text-2xl font-semibold">
                  {currentUser?.name}
                </h2>
                <p className="md:text-sm text-xs text-gray-500">
                  {currentUser?.email || "Chưa có email"}
                </p>
              </div>
            </div>

            {/* right */}
            <div>
              <button
                onClick={handleLogout}
                className="border-secondary text-secondary border px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {/* section 2 */}
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-x-4 sm:gap-y-3 mt-8">
              {/* List form fields */}
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <label
                    htmlFor={field.id}
                    className="text-sm lg:text-base font-medium"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-[#1F41BB] bg-[#F7FBFF] text-sm lg:text-base"
                    pattern={field.pattern}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="border-primary border text-primary px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Xóa tài khoản
              </button>
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Cập nhật
              </button>
            </div>
          </form>

          {/* section 3 */}
          <div>
            <div></div>
          </div>
        </>

        {isLoading && <Loading />}
      </div>

      {isLogoutModalOpen && (
        <ConfirmModal
          title="Đăng xuất"
          desc="Bạn có chắc chắn muốn đăng xuất?"
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}

      {isDeleteAccountModalOpen && (
        <ConfirmModal
          title="Xóa tài khoản"
          desc="Bạn có chắc chắn muốn xóa tài khoản này?"
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          onConfirm={handleConfirmDeleteAccount}
        />
      )}
    </>
  );
};

export default UpdateProfilePage;
