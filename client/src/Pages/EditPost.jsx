import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [fileName, setFileName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://react-backend-new.onrender.com/edit/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setFileName(postInfo.cover);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();

    if (files !== "") {
      const data = new FormData();
      data.append("title", title);
      data.append("summary", summary);
      data.append("content", content);
      data.append("id", id);
      data.append("image", files);

      const response = await fetch(
        `https://react-backend-new.onrender.com/edit/${id}`,
        {
          method: "PUT",
          body: data,
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.ok) {
        setRedirect(true);
      }
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("summary", summary);
      data.append("content", content);
      data.append("id", id);
      data.append("image", fileName);

      const response = await fetch(
        `https://react-backend-new.onrender.com/post/${id}`,
        {
          method: "PUT",
          body: data,
          credentials: "include",

          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.ok) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
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
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        placeholder="If U Want To Change Pic Then Update New Pic"
        onChange={(ev) => setFiles(ev.target.files[0])}
      />

      <ReactQuill value={content} onChange={setContent} modules={modules} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
