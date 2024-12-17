import Search from "../../components/search";
import { Link, useSearchParams } from "react-router-dom";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };
  return (
    <div className="px-4 h-max sticky top-5">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-6 mb-4 text-sm font-medium">Filters</h1>
      <div className="flex flex-col text-xs gap-3">
        <label htmlFor="" className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none w-3 h-3 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            onChange={handleFilterChange}
          />
          Newest
        </label>
        <label htmlFor="" className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="popular"
            className="appearance-none w-3 h-3 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            onChange={handleFilterChange}
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none w-3 h-3 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            onChange={handleFilterChange}
          />
          Trending
        </label>
        <label htmlFor="" className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-3 h-3 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            onChange={handleFilterChange}
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-6 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col text-xs gap-3">
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("general")}
        >
          All
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("databases")}
        >
          Databases
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("seo")}
        >
          Search Engines
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
