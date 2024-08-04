import { Link } from "@nextui-org/react";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: "url('/images/laundry.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex items-center justify-center h-full text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white md:text-6xl">
            Selamat Datang di Enigma Laundry
          </h1>
          <p className="text-xl text-white md:text-2xl">
            Catat dan kelola semua transaksi laundry Anda dengan mudah
            menggunakan aplikasi berbasis web kami.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
