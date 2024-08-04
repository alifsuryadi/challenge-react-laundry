import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Card, Input, Button } from "@nextui-org/react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama harus memiliki minimal 3 karakter" }),
  phoneNumber: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  address: z
    .string()
    .min(5, { message: "Alamat harus memiliki minimal 5 karakter" }),
});

const AddCustomer = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await axiosInstance.post("/customers", data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen">
      <Card className="w-96 p-5">
        <h1 className="text-xl font-bold mb-4 text-center">Tambah Pelanggan</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Pelanggan</label>
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
            <label className="block mb-1">Nomor Telepon</label>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" {...field} className="input-field" />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Alamat</label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} className="input-field" />
              )}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            className="btn-primary w-full mt-4"
          >
            Tambah Pelanggan
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddCustomer;
