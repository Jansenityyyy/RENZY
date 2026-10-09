import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../navbar/Sidebar';
import '../styles/DashboardLayout.css';

function DashboardLayout({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;