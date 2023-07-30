import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectRoute from "./ui/ProtectRoute";
import CreatePost from "./pages/CreatePost/CreatePost";

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="create-post"
                element={
                  <ProtectRoute>
                    <CreatePost />
                  </ProtectRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
