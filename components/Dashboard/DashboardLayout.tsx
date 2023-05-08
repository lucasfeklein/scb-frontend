import DashboardNavbar from './DashboardNavbar';

function DashboardLayout({children}) {

  return (
    <div className='flex'>
        <DashboardNavbar />
        {children}
    </div>
  )
}

export default DashboardLayout;
