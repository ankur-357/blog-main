import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("image", files);

    await axios.post("https://react-backend-new.onrender.com/post", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    });
    navigate("/");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <form onSubmit={handleCreatePost}>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="title"
          placeholder="title"
        />
        <input
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="summary"
          placeholder="summary"
        />
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <ReactQuill
          value={content}
          onChange={(e) => setContent(e)}
          modules={modules}
        />
        <button
          style={{ marginBottom: "5px", marginTop: "16px" }}
          type="submit"
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
