/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useCurrUser } from "../hooks/useCurrUser";
import { useEffect } from "react";
import Spinner from "./Spinner/Spinner";
export default function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { data, isLoading } = useCurrUser();

  useEffect(() => {
    if (!data && !isLoading) return navigate("/login");
  }, [data, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (data && !isLoading) return children;
}
