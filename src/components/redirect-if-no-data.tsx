import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface RedirectIfNoDataProps {
  data: any;
  redirectTo?: string;
}

export default function RedirectIfNoData({
  data,
  redirectTo = "/",
}: RedirectIfNoDataProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate(redirectTo, { replace: true });
    }
  }, [data, navigate, redirectTo]);

  return null; // always render nothing
}
