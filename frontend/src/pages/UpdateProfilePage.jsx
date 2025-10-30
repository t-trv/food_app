import apiRequest from "../libs/apiRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const UpdateProfilePage = () => {
  const { updateUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    apiRequest.post("/auth/logout").then((res) => {
      if (res.data.success) {
        updateUser(null);
        navigate("/login");
      }
    });
  };

  return (
    <div>
      test
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UpdateProfilePage;
