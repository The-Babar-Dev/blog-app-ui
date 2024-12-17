import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex gap-3 text-xs text-gray-600">
      <Link to="/" className="hover:text-blue-800">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <React.Fragment key={to}>
            <span>▫</span>
            {isLast ? (
              <span className="text-blue-800 capitalize">
                {value.replace(/-/g, " ")}
              </span>
            ) : (
              <Link to={to} className="hover:text-blue-800 capitalize">
                {value.replace(/-/g, " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
