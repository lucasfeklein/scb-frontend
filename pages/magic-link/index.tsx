import { LoadingPage } from "@/components/LoadingPage";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MagicLink = () => {
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        const { data } = await api.post("/verify-magic-link", { token });
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } catch (error) {
        // handle network error
      }
    };
    token && verifyMagicLink();
  }, [token]);

  return <LoadingPage />;
};

export default MagicLink;
