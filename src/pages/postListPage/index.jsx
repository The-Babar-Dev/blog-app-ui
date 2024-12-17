import { useState } from "react";
import PostList from "../../components/postsList";
import SideMenu from "../../components/sideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="my-5 text-lg">Blog Details</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-xs text-white px-4 py-2 rounded-xl mb-4  md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex gap-6 flex-col-reverse md:flex-row">
        <div className="flex-1">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
