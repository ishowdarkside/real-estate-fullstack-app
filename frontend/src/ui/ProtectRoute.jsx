/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useProtect } from "./../hooks/useProtect";
import { useEffect } from "react";
import Spinner from "./Spinner/Spinner";
export default function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { data, isLoading } = useProtect();
  useEffect(() => {
    if (!data && !isLoading) return navigate("/login");
  }, [data, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (data && !isLoading) return children;
}
