import DashboardNavbar from './DashboardNavbar';

function DashboardLayout({ children }) {
    return (
      <div className='flex flex-1'>
        <DashboardNavbar />
        <div className="flex-1 bg-white">
            {children}
        </div>
      </div>
    )
  }

export default DashboardLayout;
