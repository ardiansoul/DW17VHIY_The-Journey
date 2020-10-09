import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import { authContext } from "../context/auth";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";

function NewJourney() {
  const { userId } = useContext(authContext);
  const [journey, setJourney] = useState({
    title: "",
    description: "",
    userId: userId,
  });

  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem("token");
  const ChangeHandler = (event) => {
    setJourney({ ...journey, title: event.target.value });
  };

  const CKhandler = (event, editor) => {
    const data = editor.getData();
    setJourney({ ...journey, description: data });
  };
  const handleSubmit = async () => {
    console.log(journey);

    try {
      const result = await Axios({
        method: "POST",
        url: `http://localhost:5000/api/v1/journey/`,
        data: journey,
        headers: {
          Authorization: token,
        },
      });

      console.log(result);
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(journey);
  return (
    <>
      {redirect ? <Redirect to="/profile" /> : ""}
      <Navbar />
      <div className="form-journey section">
        {/* {result ? (
          <span className="alert">{result.data.data.message}</span>
        ) : (
          ""
        )} */}
        <input
          className="form-journey-title"
          type="text"
          name="title"
          value={journey.title}
          onChange={ChangeHandler}
          placeholder="Title.."
        />
        <CKEditor
          className="ckeditor"
          editor={ClassicEditor}
          data={journey.description}
          onChange={CKhandler}
          config={{
            // toolbar: ["ckfinder", "imageUpload"],
            plugin: ["ckfinder"],
            ckfinder: {
              uploadUrl: "http://localhost:5000/upload",
            },
          }}
        />
        <button className="btn form-journey-btn" onClick={handleSubmit}>
          Kirim
        </button>
      </div>
      <Footer />
    </>
  );
}

export default NewJourney;
