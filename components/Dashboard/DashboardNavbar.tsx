import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

function DashboardNavbar() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/auth-verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmail(data.email);
      } catch (error) {
        console.error(error);
        alert(error.message);
        router.push("/signin");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-60">
      <div className="dashboard-border-color flex h-full w-full flex-col border-r">
        <div className="bg-gray-900 dashboard-border-color border-b px-6 py-4">
          <h1 className="text-lg font-bold">ChatChima Bot</h1>
        </div>
        <div className="dashboard-border-color flex items-center gap-2 border-b px-6 py-4">
          <MdSpaceDashboard />
          <p>Dashboard</p>
        </div>
        <div className="flex-1 bg-gray px-6 py-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/create"
                className={`flex items-center gap-2 rounded-md px-6 py-2 hover:bg-primary hover:text-white ${
                  router.pathname === "/dashboard/create" ? "text-primary" : ""
                }`}
              >
                <BsFillPlusCircleFill />
                <p>Criar</p>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/custom"
                className={`flex items-center gap-2 rounded-md px-6 py-2 hover:bg-primary hover:text-white ${
                  router.pathname === "/dashboard/custom" ? "text-primary" : ""
                }`}
              >
                <FaEdit />
                <p>Customizar</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-border-color border-t px-6 py-4">
          <p>Email: {email}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
