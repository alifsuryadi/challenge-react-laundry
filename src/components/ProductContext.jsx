import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

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
  }, []);

  useEffect(() => {
    const saveProducts = async () => {
      try {
        await axiosInstance.post("/products", { products });
      } catch (error) {
        console.error("Gagal menyimpan produk", error);
      }
    };

    saveProducts();
  }, [products]);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await axiosInstance.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProducts([...products, response.data.data]);
    } catch (error) {
      console.error("Gagal menambah produk", error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      await axiosInstance.put(
        `/products/${updatedProduct.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Gagal memperbarui produk", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
