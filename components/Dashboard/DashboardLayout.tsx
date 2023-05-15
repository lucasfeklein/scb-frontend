import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];
type User = {
  email: string;
  name?: string;
  company: {
    id: number;
    userId: number;
    name: string;
    website: string;
  }[];
};

function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState<User | false>(false);
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team>(groups[0].teams[0]);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/auth-verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
        router.push("/signin");
      }
    }
    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  console.log(user);
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const { data } = await api.post(
        "/onboarding",
        { name: name, companyName: companyName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prevUser) => ({
        name: name,
        email: prevUser ? prevUser.email : "",
        company: [data],
      }));
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setName("");
    setCompanyName("");
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  if (!user.name) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Onbording</CardTitle>
            <CardDescription>
              Preencha seu nome e o nome da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Nome completo:</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="companyName">Nome da sua empresa:</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  placeholder="Empresa Exemplo"
                />
              </div>
              <Button
                variant="secondary"
                className="shrink-0 bg-blue-600 text-white hover:bg-blue-500 hover:shadow-xl"
                type="submit"
              >
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="mr-4 font-bold">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select a team"
                  className={"w-[200px] justify-between"}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                      alt={selectedTeam.label}
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {selectedTeam.label}
                  <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandInput placeholder="Search team..." />
                    <CommandEmpty>No team found.</CommandEmpty>
                    {groups.map((group) => (
                      <CommandGroup key={group.label} heading={group.label}>
                        {group.teams.map((team) => (
                          <CommandItem
                            key={team.value}
                            onSelect={() => {
                              setSelectedTeam(team);
                              setOpen(false);
                            }}
                            className="text-sm"
                          >
                            <Avatar className="mr-2 h-5 w-5">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${team.value}.png`}
                                alt={team.label}
                              />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            {team.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedTeam.value === team.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <nav className={"mx-6 flex items-center space-x-4 lg:space-x-6"}>
            <Link
              href="/dashboard/create"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Create
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>
                      {user.email[0]}
                      {user.email[1]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default DashboardLayout;
