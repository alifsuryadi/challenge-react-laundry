# Enigma Laundry Web Application

![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![React Router](https://img.shields.io/badge/-React%20Router-05122A?style=flat&logo=react-router)&nbsp;
![Axios](https://img.shields.io/badge/-Axios-05122A?style=flat&logo=axios)&nbsp;
![Zod](https://img.shields.io/badge/-Zod-05122A?style=flat&logo=zod)&nbsp;
![NextUI](https://img.shields.io/badge/-NextUI-05122A?style=flat&logo=nextui)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-05122A?style=flat&logo=tailwindcss)&nbsp;

Enigma Laundry adalah aplikasi web sederhana untuk mengelola produk, pelanggan, dan transaksi di sebuah toko laundry. Aplikasi ini dibangun menggunakan teknologi modern seperti React, Vite, Tailwind CSS, NextUI, Axios, React Router, dan banyak lagi.

## Table of Contents

- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Instalasi](#instalasi)
- [Struktur Proyek](#struktur-proyek)
- [Konfigurasi API](#Konfigurasi-API)
- [Cara Penggunaan](#Cara-Penggunaan)
- [Kontribusi](#Kontribusi)

## Fitur

1. **Manajemen Produk**

   - Menambah produk baru
   - Melihat daftar produk
   - Mengedit detail produk
   - Menghapus produk

2. **Manajemen Pelanggan**

   - Menambah pelanggan baru
   - Melihat daftar pelanggan
   - Mengedit detail pelanggan
   - Menghapus pelanggan

3. **Manajemen Transaksi**

   - Membuat transaksi baru
   - Melihat daftar transaksi
   - Melihat detail tiap transaksi

4. **Autentikasi Pengguna**
   - Login dan Logout

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Vite**: Alat build yang cepat untuk pengembangan front-end modern.
- **Tailwind CSS**: Framework CSS utilitas untuk styling yang cepat dan mudah.
- **NextUI**: Komponen UI untuk React yang modern dan sepenuhnya dikendalikan.
- **Axios**: Klien HTTP untuk melakukan permintaan ke API.
- **React Router**: Routing untuk aplikasi React.
- **React Hook Form & Zod**: Pengelolaan form dan validasi.
- **React Icons**: Pustaka ikon untuk React.
- **react-toastify**: Untuk menampilkan notifikasi.

## Instalasi

1. Clone repository ini:

   ```bash
   git clone https://github.com/alifsuryadi/challenge-react-laundry.git
   cd challenge-react-laundry
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

4. Buka di browser:

Buka `http://localhost:5174` untuk melihat aplikasi berjalan.

## Struktur Proyek

| File/Folder Name                    | Description                     |
| ----------------------------------- | ------------------------------- |
| `src/assets/`                       | Aset seperti gambar, ikon, dll. |
| `src/components/`                   | Komponen UI dan logika terkait. |
| `src/components/ProductContext.jsx` | Konteks produk.                 |
| `src/components/products/`          | Komponen terkait produk.        |
| `src/components/customers/`         | Komponen terkait pelanggan.     |
| `src/components/transactions/`      | Komponen terkait transaksi.     |
| `src/lib/`                          | Utility dan helper.             |
| `src/lib/axios.js`                  | Konfigurasi axios.              |
| `src/pages/`                        | Halaman utama aplikasi.         |
| `src/pages/HomePage.jsx`            | Komponen untuk halaman beranda. |
| `src/pages/LoginPage.jsx`           | Komponen untuk halaman login.   |
| `src/pages/dashboard/`              | Halaman terkait dashboard.      |
| `src/App.jsx`                       | Komponen utama aplikasi.        |
| `src/index.css`                     | Gaya global.                    |
| `src/main.jsx`                      | Entry point aplikasi.           |

## Konfigurasi API

Pastikan Anda memiliki server API yang berjalan dan endpoint disesuaikan dengan kebutuhan aplikasi. Endpoint default dalam proyek ini adalah `http://localhost:8888/api/v1`. dan anda bisa baca [README](https://github.com/alifsuryadi/challenge-react-laundry/blob/development/src/API/README.md) ini untuk melihat API yang saya gunakan.

## Cara Penggunaan

1. `Login`: Masuk dengan menggunakan kredensial yang valid.
2. `Dashboard`: Setelah login, Anda akan diarahkan ke dashboard di mana Anda dapat mengelola produk, pelanggan, dan transaksi.
3. `Tambah/Edit/Hapus`: Anda dapat menambahkan, mengedit, dan menghapus produk, pelanggan, dan transaksi melalui antarmuka yang disediakan.

## Kontribusi

Kontribusi selalu diterima! Silakan fork repository ini dan buat pull request untuk menambahkan fitur atau memperbaiki bug.
