import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "@nextui-org/react";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    const timer = setTimeout(() => {
      navigate("/auth/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <Card className="p-6 max-w-md w-full shadow-lg">
        <div className="flex flex-col items-center">
          <FaSignOutAlt size={40} className="text-red-500 mb-4" />
          <h1 size={24} className="mb-4 text-center">
            Logout Berhasil
          </h1>
          <p className="text-center mb-4">
            Anda telah berhasil logout. Anda akan diarahkan ke halaman login
            dalam beberapa detik.
          </p>
          <Button
            auto
            flat
            color="primary"
            className="mt-4"
            onClick={() => navigate("/auth/login")}
          >
            Kembali ke Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Logout;
