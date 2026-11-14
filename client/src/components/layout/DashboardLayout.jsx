import { Outlet, useNavigate } from "react-router-dom";
import DashboardTopbar from "../../pages/users/dashboard/components/DashboardTopbar";
import DeshboardSidebar from "../../pages/users/dashboard/components/DeshboardSidebar";

const accounts = [
  {
    id: "1",
    name: "Trust me I am an Engineer",
    username: "GobindaGagan",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxZxrWMhXaNYTkx9GpjVmwbjLq73WazhOsTIfLKpTMg&s=10",
    plan: "Free",
    profileUrl: "https://linkora.bio/GobindaGagan",
  },
  {
    id: "2",
    name: "@gobindagagandey",
    username: "gobindagagandey",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxZxrWMhXaNYTkx9GpjVmwbjLq73WazhOsTIfLKpTMg&s=10",
    plan: "Free",
    profileUrl: "https://linkora.bio/gobindagagandey",
  },
  {
    id: "3",
    name: "@gobindagagandey7",
    username: "gobindagagandey7",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxZxrWMhXaNYTkx9GpjVmwbjLq73WazhOsTIfLKpTMg&s=10",
    plan: "Free",
    profileUrl: "https://linkora.bio/gobindagagandey7",
  },
  {
    id: "4",
    name: "@xyzjjhgfdssdfg",
    username: "xyzjjhgfdssdfg",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxZxrWMhXaNYTkx9GpjVmwbjLq73WazhOsTIfLKpTMg&s=10",
    plan: "Free",
    profileUrl: "https://linkora.bio/xyzjjhgfdssdfg",
  },
];

function DashboardLayout() {
  const navigate = useNavigate();

  // LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      // Call your logout API here if available.

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (action) => {
    console.log("Navigation:", action);
  };

  const handleSwitchAccount = (account) => {
    console.log("Selected account:", account);
    // Update active profile using your app state/API.
  };
  return (
    <>
      <DashboardTopbar
        user={accounts[0]}
        accounts={accounts}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
        onSwitchAccount={(account) => {
          console.log("Switching account:", account);
        }}
      />

      <DeshboardSidebar />
      <main className="min-h-screen bg-background pt-17 md:ml-65">
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
