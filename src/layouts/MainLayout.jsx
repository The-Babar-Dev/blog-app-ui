import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import BreadCrumb from "../components/breadcrumb";

const MainLayout = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Navbar />
      {/* BREADCRUMB */}
      <div className="flex gap-3 my-1 text-sm font-semibold py-2">
        <BreadCrumb />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
