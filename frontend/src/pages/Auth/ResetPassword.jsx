import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePassword } from "../../api/userApi";

const ResetPassword = () => {
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(userId, newPassword);
      alert("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.error || "Error resetting password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-3 rounded-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
