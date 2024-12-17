import { Link } from "react-router-dom";
import Search from "../search";

const MainCategories = () => {
  return (
    <div className="hidden md:flex items-center justify-center gap-8 bg-white rounded-3xl xl:rounded-full p-3 shadow-lg">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap text-xs">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-gray-50  rounded-full px-4 py-2"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-gray-50  rounded-full px-4 py-2"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=databases"
          className="hover:bg-gray-50  rounded-full px-4 py-2"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-gray-50  rounded-full px-4 py-2"
        >
          Search Engines
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-gray-50  rounded-full px-4 py-2"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      <Search />
    </div>
  );
};

export default MainCategories;
