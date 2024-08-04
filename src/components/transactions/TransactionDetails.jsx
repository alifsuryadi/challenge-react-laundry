import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axiosInstance.get(`/bills/${id}`);
        setTransaction(response.data.data);
      } catch (error) {
        console.error("Gagal memuat detail transaksi", error);
      }
    };

    fetchTransaction();
  }, [id]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="p-4 w-screen bg-gradient-to-r from-blue-200 to-blue-300">
      <h2 className="text-xl font-bold">Detail Transaksi</h2>
      <p>ID Transaksi: {transaction.id}</p>
      <p>Nama Pelanggan: {transaction.customer.name}</p>
      <p>
        Jumlah:{" "}
        {transaction.amount.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
      <p>Detail: {transaction.details}</p>
    </div>
  );
};

export default TransactionDetails;
