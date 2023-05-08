import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

function Dashboard() {
  const [activeLink, setActiveLink] = useState(null);

  function handleLinkClick(index) {
    setActiveLink(index);
  }

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-60 border-r dashboard-border-color">
        <div className="py-4 px-6 bg-gray-900 border-b dashboard-border-color">
          <h1 className="text-lg font-bold">ChatChima Bot</h1>
        </div>
        <div className={`flex gap-2 items-center py-4 px-6 border-b dashboard-border-color ${activeLink === 0 ? 'text-white bg-primary' : 'hover:text-white hover:bg-primary'}`} onClick={() => handleLinkClick(0)}>
          <MdSpaceDashboard />
          <p>Dashboard</p>
        </div>
        <div className="flex-1 py-4 px-6 bg-gray">
          <ul className="space-y-2">
            <li>
              <a href="#" className={`flex gap-2 items-center py-2 px-6 rounded-md ${activeLink === 1 ? 'text-white bg-primary' : 'hover:text-white hover:bg-primary'}`} onClick={() => handleLinkClick(1)}>
                <BsFillPlusCircleFill />
                <p>Criar</p>
              </a>
            </li>
            <li>
              <a href="#" className={`flex gap-2 items-center py-2 px-6 rounded-md ${activeLink === 2 ? 'text-white bg-primary' : 'hover:text-white hover:bg-primary'}`} onClick={() => handleLinkClick(2)}>
                <FaEdit/>
                <p>Customizar</p>
              </a>
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

export default Dashboard