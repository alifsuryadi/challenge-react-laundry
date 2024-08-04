import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama harus memiliki minimal 3 karakter" }),
  phoneNumber: z.string().min(8, { message: "Nomor telepon tidak valid" }),
  address: z
    .string()
    .min(5, { message: "Alamat harus memiliki minimal 5 karakter" }),
});

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axiosInstance.get(`/customers/${id}`);
        setCustomer(response.data.data);
      } catch (error) {
        console.error("Gagal memuat pelanggan", error);
      }
    };

    fetchCustomer();
  }, [id]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: customer,
  });

  const onSubmit = async (data) => {
    await axiosInstance.put(`/customers/${id}`, data);
    navigate("/dashboard");
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-200 to-blue-300 ">
      <Card className="w-96 p-5">
        <h1 className="text-xl font-bold mb-4 text-center">Edit Pelanggan</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nama Pelanggan</label>
            <Controller
              name="name"
              control={control}
              defaultValue={customer.name}
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
              defaultValue={customer.phoneNumber}
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
              defaultValue={customer.address}
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
            Simpan Perubahan
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditCustomer;
