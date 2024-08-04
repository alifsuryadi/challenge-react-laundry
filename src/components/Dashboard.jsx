// Dashboard.jsx
import { useEffect, useState } from "react";
import { useProducts } from "./ProductContext";
import { axiosInstance } from "../lib/axios";
import ProductList from "./ProductList";
import CustomerList from "./CustomerList";
import TransactionList from "./TransactionList";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "@nextui-org/react";

const Dashboard = () => {
  const { products } = useProducts();
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Gagal memuat pelanggan", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/bills");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Gagal memuat transaksi", error);
      }
    };

    fetchCustomers();
    fetchTransactions();
  }, []);

  const totalProducts = products.length || "-";
  const totalCustomers = customers.length || "-";
  const totalTransactions = transactions.length || "-";
  const totalTransactionAmount = transactions.length
    ? transactions
        .reduce(
          (sum, transaction) =>
            sum +
            transaction.billDetails.reduce(
              (detailSum, detail) => detailSum + detail.price * detail.qty,
              0
            ),
          0
        )
        .toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })
    : "-";

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleAddProduct = () => navigate("/dashboard/product/add");
  const handleAddCustomer = () => navigate("/dashboard/customer/add");
  const handleAddTransaction = () => navigate("/dashboard/transaction/add");

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">
          Dashboard Enigma Laundry
        </h1>
        <Button
          onClick={handleLogout}
          color="primary"
          auto
          className="bg-red-600 hover:bg-red-800 font-semibold"
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-700">Total Produk</h4>
          <h3 className="text-3xl font-bold">{totalProducts}</h3>
          <Button
            color="primary"
            auto
            className="mt-4"
            onClick={handleAddProduct}
          >
            Tambah Produk
          </Button>
        </Card>

        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-700">
            Total Pelanggan
          </h4>
          <h3 className="text-3xl font-bold">{totalCustomers}</h3>
          <Button
            color="primary"
            auto
            className="mt-4"
            onClick={handleAddCustomer}
          >
            Tambah Pelanggan
          </Button>
        </Card>

        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-700">
            Total Transaksi
          </h4>
          <h3 className="text-3xl font-bold">{totalTransactions}</h3>
          <Button
            color="primary"
            auto
            className="mt-4"
            onClick={handleAddTransaction}
          >
            Tambah Transaksi
          </Button>
        </Card>

        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-700">
            Total Jumlah Transaksi
          </h4>
          <h3 className="text-3xl font-bold">{totalTransactionAmount}</h3>
        </Card>
      </div>

      <div className="space-y-8">
        <ProductList />
        <CustomerList />
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;
