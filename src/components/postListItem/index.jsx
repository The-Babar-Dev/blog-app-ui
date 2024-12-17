import Image from "../image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 mb-8">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post.img}
            className="rounded-2xl object-cover"
            width="800"
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-2xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <span>Written by</span>
          <Link
            className="text-blue-800"
            to={`/posts?author=${post?.user?.username}`}
          >
            {post?.user?.username?.toUpperCase()}
          </Link>
          <span>on</span>
          <Link className="text-blue-800">{post.category?.toUpperCase()}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-xs">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
