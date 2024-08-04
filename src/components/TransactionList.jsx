// TransactionList.jsx
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import {
  Table,
  TableBody,
  TableColumn,
  TableRow,
  TableHeader,
  TableCell,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/bills");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Gagal memuat transaksi", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleOpenModal = (transaction) => {
    console.log("Opening modal for transaction:", transaction);
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const calculateTotalAmount = (billDetails) => {
    return billDetails.reduce(
      (total, detail) => total + detail.price * detail.qty,
      0
    );
  };

  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
    console.log("Selected transaction:", selectedTransaction);
  }, [isModalOpen, selectedTransaction]);

  return (
    <div className="data-table mb-4">
      <h2 className="text-lg font-semibold mb-2">Daftar Transaksi</h2>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>Kode Transaksi</TableColumn>
          <TableColumn>Nama Transaksi</TableColumn>
          <TableColumn>Jumlah</TableColumn>
          <TableColumn>Detail</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.customer.name}</TableCell>
              <TableCell>
                {transaction.billDetails
                  ? calculateTotalAmount(
                      transaction.billDetails
                    ).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  auto
                  flat
                  color="primary"
                  onClick={() => handleOpenModal(transaction)}
                >
                  Lihat Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTransaction && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={isModalOpen}
          onClose={handleCloseModal}
        >
          <ModalHeader>
            <p id="modal-title" size={18}>
              Detail Transaksi
            </p>
          </ModalHeader>
          <ModalBody>
            <Table
              aria-label="Detail table"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <TableHeader>
                <TableColumn>Nama Produk</TableColumn>
                <TableColumn>Harga</TableColumn>
                <TableColumn>Kuantitas</TableColumn>
                <TableColumn>Total</TableColumn>
              </TableHeader>
              <TableBody>
                {selectedTransaction.billDetails.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell>{detail.product.name}</TableCell>
                    <TableCell>
                      {detail.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                    <TableCell>{detail.qty}</TableCell>
                    <TableCell>
                      {(detail.price * detail.qty).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default TransactionList;
