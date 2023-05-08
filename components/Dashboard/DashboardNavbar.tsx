import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

function DashboardNavbar() {
  const router = useRouter();

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-60 border-r dashboard-border-color">
        <div className="py-4 px-6 bg-gray-900 border-b dashboard-border-color">
          <h1 className="text-lg font-bold">ChatChima Bot</h1>
        </div>
        <div className="flex gap-2 items-center py-4 px-6 border-b dashboard-border-color" >
          <MdSpaceDashboard />
          <p>Dashboard</p>
        </div>
        <div className="flex-1 py-4 px-6 bg-gray">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/create"
                className={`flex gap-2 items-center py-2 px-6 rounded-md hover:text-white hover:bg-primary ${
                  router.pathname === '/dashboard/create' ? 'text-primary' : ''
                }`}
              >
                <BsFillPlusCircleFill />
                <p>Criar</p>                
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={`flex gap-2 items-center py-2 px-6 rounded-md hover:text-white hover:bg-primary ${
                  router.pathname === '/dashboard' ? 'text-primary' : ''
                }`}
              >
                <FaEdit/>
                <p>Customizar</p>       
              </Link>
            </li>
          </ul>
        </div>
        <div className="py-4 px-6 border-t dashboard-border-color">
          <p>Email: abc@example.com</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar;