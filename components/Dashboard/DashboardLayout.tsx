import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-screen">
      <DashboardNavbar />
      <div className="flex gap-6 p-6">{children}</div>
    </div>
  );
}

export default DashboardLayout;
