import { Link } from "react-router-dom";
import MainCategories from "../../components/mainCategories";
import FeaturedPosts from "../../components/featuredPosts";
import PostsList from "../../components/postsList";
import BreadCrumb from "../../components/breadcrumb";

const HomePage = () => {
  return (
    <div className="mt-3 flex flex-col gap-3">
      {/* INTRODUCTION */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* titles */}
        <div className="my-8">
          <h1 className="text-gray-800 text-xl md:text-2xl lg:text-3xl font-bold w-[95%] md:w-[85] mb-6">
            Share Your Ideas, Amplify Your Voice, and Inspire the World on Your
            Blogging Platform.
          </h1>
          <p className="mt-5 text-md md:text-lg w-[95%] md:w-[85%]">
            Explore insightful articles, share your unique stories, and connect
            with readers worldwide. Start your blogging journey here and make
            your voice heard.
          </p>
        </div>
        {/* animated button */}
        <Link to="/write" className="relative">
          <svg
            viewBox="0 0 200 200"
            width="170"
            height="170"
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75, 75 0 1, 1 150, 0 a 75, 75 0 1, 1 -150, 0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Wrote your story ▫
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea ▫
              </textPath>
            </text>
          </svg>
          <button className="bg-blue-800 rounded-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 m-auto w-16 h-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* MAIN CATEGORIES */}
      <MainCategories />
      {/* FEATURED POST */}
      <div>
        <h1 className="my-5 text-xl text-gray-600">Featured Posts</h1>
        <FeaturedPosts />
      </div>
      {/* POSTS LIST */}
      <div>
        <h1 className="my-5 text-xl text-gray-600">Recent Posts</h1>
        <PostsList />
      </div>
    </div>
  );
};

export default HomePage;
