import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../components/ProductContext";
import { Card, Input, Button } from "@nextui-org/react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama produk harus memiliki minimal 3 karakter" }),
  price: z.coerce.number().min(0, { message: "Harga tidak boleh negatif" }),
  type: z
    .string()
    .min(1, { message: "Tipe produk harus memiliki minimal 1 karakter" }),
});

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await addProduct(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-200 to-blue-300">
      <Card className="w-96 p-5">
        <h1 className="text-xl text-center font-bold mb-8">Tambah Produk</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Produk</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} className="input-field" />
              )}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Harga</label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="number" {...field} className="input-field" />
              )}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Tipe Produk</label>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} className="input-field" />
              )}
            />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <Button type="submit" color="primary" className="w-full mt-4">
            Tambah Produk
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
