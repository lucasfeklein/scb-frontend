import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <div className="border-b">
    <div className="flex h-16 items-center px-4">

    <div className="mr-4 font-bold">
      <h5>
        Dashboard Chatbot
      </h5>
    </div>

    <nav
      className={"flex items-center space-x-4 lg:space-x-6 mx-6"}
     
    >
      <Link
           href="/dashboard/create"
       >
        Create
      </Link>
      
    </nav>

    <div className="ml-auto flex items-center space-x-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{email[0]}{email[1]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
             {email}
            </p>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu></div>

    </div>
    </div>
  );
}

export default DashboardNavbar;
