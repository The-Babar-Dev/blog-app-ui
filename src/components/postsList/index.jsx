import { useInfiniteQuery } from "@tanstack/react-query";
import PostListItem from "../postListItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import Spinner from "../spinner";

const fetchPosts = async (pageParams, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    params: { page: pageParams, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isLoading, status } =
    useInfiniteQuery({
      queryKey: ["posts", searchParams?.toString()],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  if (isLoading) return <Spinner />;

  if (status === "error") return <p>Something went wrong</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <>
      {allPosts.length === 0 ? (
        <p className="text-center my-5 text-gray-500">No results found!</p>
      ) : (
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          endMessage={
            <p className="text-sm my-3 mb-5">
              {allPosts.length > 0 && "All posts loaded!"}
            </p>
          }
        >
          {allPosts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default PostsList;
