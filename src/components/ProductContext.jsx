import React, { createContext, useContext, useState, useEffect } from "react";
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

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }
      console.log("Request data:", product);

      const response = await axiosInstance.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProducts([...products, response.data.data]);
    } catch (error) {
      console.error("Gagal menambah produk", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }
      console.log("Request data:", updatedProduct);

      await axiosInstance.put(`products`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Gagal memperbarui produk", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      await axiosInstance.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
