import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout/AppLayout";
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
import ProtectRoute from "./ui/ProtectRoute";
const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost"));
import PositionContext from "./context/PositionContext";
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Post = lazy(() => import("./pages/Post/Post"));
import ModalContext from "./context/modalContext";
const SpecificProfile = lazy(() =>
  import("./pages/specificProfile/specificProfile")
);
import ProfileContext from "./context/profileContext";
const Me = lazy(() => import("./pages/Me/Me"));
import DashboardContext from "./context/dashboardContext";
import Spinner from "./ui/Spinner/Spinner";

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route
                  path="dashboard"
                  element={
                    <DashboardContext>
                      <Dashboard />
                    </DashboardContext>
                  }
                />
                <Route
                  path="create-post"
                  element={
                    <ProtectRoute>
                      <PositionContext>
                        <CreatePost />
                      </PositionContext>
                    </ProtectRoute>
                  }
                />
                <Route path="catalog" element={<Catalog />}></Route>
                <Route
                  path="post/:postId"
                  element={
                    <ModalContext>
                      <Post />
                    </ModalContext>
                  }
                />
                <Route
                  path="profile/:profileId"
                  element={
                    <ProfileContext>
                      <SpecificProfile />
                    </ProfileContext>
                  }
                />
                <Route
                  path="me"
                  element={
                    <ProtectRoute>
                      <Me />
                    </ProtectRoute>
                  }
                />
              </Route>
              <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </>
  );
}
