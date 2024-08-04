import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { Card, Input, Button, Select, SelectItem } from "@nextui-org/react";

const schema = z.object({
  customerId: z.string().nonempty({ message: "Pelanggan harus dipilih" }),
  billDetails: z.array(
    z.object({
      product: z.object({
        id: z.string().nonempty({ message: "Produk harus dipilih" }),
      }),
      qty: z.number().min(1, { message: "Jumlah harus lebih dari 0" }),
    })
  ),
});

const AddTransaction = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Gagal memuat pelanggan", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Gagal memuat produk", error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    await axiosInstance.post("/bills", data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-200 to-blue-300">
      <Card className="w-96 p-5">
        <h1 className="text-xl font-bold mb-4">Tambah Transaksi</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Pelanggan</label>
            <Controller
              name="customerId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  aria-label="Pilih pelanggan"
                  placeholder="Pilih Pelanggan"
                  className="input-field"
                >
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.customerId && (
              <p className="text-red-500">{errors.customerId.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Produk</label>
            <Controller
              name="billDetails.0.product.id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  aria-label="Pilih produk"
                  placeholder="Pilih Produk"
                  className="input-field"
                >
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.billDetails?.[0]?.product?.id && (
              <p className="text-red-500">
                {errors.billDetails[0].product.id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Jumlah</label>
            <Controller
              name="billDetails.0.qty"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  aria-label="Jumlah produk"
                  className="input-field"
                />
              )}
            />
            {errors.billDetails?.[0]?.qty && (
              <p className="text-red-500">
                {errors.billDetails[0].qty.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            className="btn-primary w-full mt-4"
          >
            Tambah Transaksi
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddTransaction;
