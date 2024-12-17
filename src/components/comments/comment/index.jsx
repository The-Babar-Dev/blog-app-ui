import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "timeago.js";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const role = user?.publicMetadata?.role;

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();

      return axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  return (
    <div className="p-3 bg-slate-50 rounded-xl">
      <div className="flex items-center gap-4">
        {comment.user?.img && (
          <img
            src={comment.user?.img}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <span className="font-medium text-sm">{comment.user?.username}</span>
        <span className="text-xs text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment?.user?.username === user?.username || role === "admin") && (
            <span
              className="text-xs text-red-300 hover:text-red-600 hover:cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              delete
              {mutation.isPending && (
                <span className="text-xs">(deleting comment...)</span>
              )}
            </span>
          )}
      </div>
      <div className="mt-4 text-sm ml-2">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
