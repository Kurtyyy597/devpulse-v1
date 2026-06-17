import DashboardComponent from "../../components/pages-component/dashboard-component/DashboardComponent";
import { useDashboard } from "../../hooks/queries/useDashboard";
import "./Dashboard.css";

function DashboardPage() {
  const { data: dashboardResponse, isLoading, error } = useDashboard();



  if (isLoading) {
    return <span className="loading"> Loading dashboard... </span>;
  }

  if (error) {
    return <span className="error"> Failed to load dashboard.</span>;
  }

  if (!dashboardResponse) {
    return <span className="data-error"> Failed to load data </span>;
  }

  return (
    <div className="dashboard-wrapper-page">
      <DashboardComponent dashboard={dashboardResponse?.data} />
    </div>
  );
}

export default DashboardPage;
