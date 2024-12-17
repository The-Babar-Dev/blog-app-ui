import { Link, useParams } from "react-router-dom";
import Image from "../../components/image";
import PostMenuActions from "../../components/postMenuActions";
import Search from "../../components/search";
import Comments from "../../components/comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import Spinner from "../../components/spinner";

const fetchPost = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts/${slug}`
  );

  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <Spinner />;
  if (error) return "Something went wrong! " + error.message;
  if (!data) return "Post not found";

  return (
    <div className="flex flex-col gap-8 py-4 md:py-10">
      {/* details */}
      <div className="flex gap-8">
        <div className="md:w-3/5 flex flex-col gap-5">
          <h1 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user?.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium text-justify">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden md:block w-2/5">
            <Image src={data.img} width="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-7">
        {/* text */}
        <div className="lg:text-md flex flex-col gap-6 text-justify">
          <p dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-4">
          <h1 className="mb-3 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              {data.user?.img && (
                <img
                  src={data.user.img}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <Link className="text-blue-800">{data.user?.username}</Link>
            </div>
            <p className="text-sm text-gray-500">Follow us on socials !</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-6 mb-3 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="underline">
              All
            </Link>
            <Link to="/" className="underline">
              Web Design
            </Link>
            <Link to="/" className="underline">
              Development
            </Link>
            <Link to="/" className="underline">
              Databases
            </Link>
            <Link to="/" className="underline">
              Search Engines
            </Link>
            <Link to="/" className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-6 mb-3 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
