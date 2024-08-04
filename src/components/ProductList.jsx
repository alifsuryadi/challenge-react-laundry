// ProductList.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./ProductContext";
import { axiosInstance } from "../lib/axios";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
} from "@nextui-org/react"; // Gunakan Table dan Button dari NextUI

const ProductList = () => {
  const { products, setProducts } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Gagal memuat produk", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk", error);
    }
  };

  return (
    <div className="data-table mb-4">
      <h2 className="text-lg font-semibold mb-2">Daftar Produk</h2>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>Nama Produk</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>Rp {product.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>
                <Button
                  as={Link}
                  to={`/dashboard/product/edit/${product.id}`}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  color="primary"
                  className="bg-red-500 hover:bg-red-600 "
                  onClick={() => deleteProduct(product.id)}
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

export default ProductList;
