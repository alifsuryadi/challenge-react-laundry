import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Logout from "./components/Logout";

// Lazy load components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const AddProduct = lazy(() => import("./components/products/AddProduct"));
const EditProduct = lazy(() => import("./components/products/EditProduct"));
const AddCustomer = lazy(() => import("./components/customers/AddCustomer"));
const EditCustomer = lazy(() => import("./components/customers/EditCustomer"));
const AddTransaction = lazy(() =>
  import("./components/transactions/AddTransaction")
);
const TransactionDetails = lazy(() =>
  import("./components/transactions/TransactionDetails")
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LoginPage />
            </Suspense>
          }
        />
        {/* <Route path="/auth/login" element={<LoginPage />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/product/add"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddProduct />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/product/edit/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <EditProduct />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/customer/add"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddCustomer />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/customer/edit/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <EditCustomer />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/transaction/add"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddTransaction />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/transaction/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <TransactionDetails />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
