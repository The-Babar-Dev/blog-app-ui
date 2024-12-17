import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../../components/upload";
import Spinner from "../../components/spinner";

const WritePage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");

  const { isLoaded, isSignedIn } = useUser();

  const { getToken } = useAuth();

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src='${img.url}' /></p>`);
  }, [img]);
  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src='${video.url}' /></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();

      return axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created!");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) return <Spinner />;
  // if (isLoaded && !isSignedIn) return <div>You should login.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      img: coverImg.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-3">
      <h1 className="text-lg font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 mb-4">
        <Upload
          mediaType="image"
          setProgress={setImageUploadProgress}
          setData={setCoverImg}
        >
          <button
            type="button"
            className="shadow-md p-2 rounded-lg text-xs text-gray-500 bg-white w-max"
          >
            Add a cover image
          </button>
        </Upload>
        <input
          type="text"
          placeholder="Add title here"
          className="text-lg font-semibold bg-transparent outline-none"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-lg bg-white shadow-md text-xs"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="A Short Description"
          rows={4}
          className="p-3 rounded-lg bg-white shadow-md text-sm"
        ></textarea>
        <div className="flex flex-1 ">
          {/* <div className="flex flex-col gap-2 mr-2">
            <Upload
              mediaType="image"
              setProgress={setImageUploadProgress}
              setData={setImg}
            >
              📷
            </Upload>
            <Upload
              mediaType="video"
              setProgress={setImageUploadProgress}
              setData={setVideo}
            >
              ▶
            </Upload>
          </div> */}
          <ReactQuill
            theme="snow"
            className="rounded-xl bg-white shadow-md flex-1 "
            value={value}
            onChange={setValue}
            readOnly={0 < imageUploadProgress && imageUploadProgress < 100}
          />
        </div>
        <button
          disabled={
            mutation.isPending ||
            (0 < imageUploadProgress && imageUploadProgress < 100)
          }
          className="bg-blue-800 text-white font-medium rounded-lg mt-3 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed mb-10"
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
        {/* {"Progress:" + imageUploadProgress} */}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default WritePage;
