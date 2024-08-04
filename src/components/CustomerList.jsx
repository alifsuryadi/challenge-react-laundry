import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import {
  Table,
  TableBody,
  TableColumn,
  TableRow,
  TableHeader,
  TableCell,
  Button,
} from "@nextui-org/react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Gagal memuat pelanggan", error);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      await axiosInstance.delete(`/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Gagal menghapus pelanggan", error);
    }
  };

  return (
    <div className="data-table mb-4">
      <h2 className="text-lg font-semibold mb-2">Daftar Pelanggan</h2>
      <Table
        aria-label="Daftar Pelanggan"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Nomor Hp</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>
                <Button
                  as={Link}
                  to={`/dashboard/customer/edit/${customer.id}`}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  color="primary"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
