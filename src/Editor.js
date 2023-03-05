import React, { useState } from "react";
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ edit }) {
  const { noteId } = useParams();
  // useOutletContext returns [note]
  const [notes, updateNote] = useOutletContext();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const saveButton = () => {
    const newNote = { ...notes[noteId], title, body, time };
    updateNote(newNote, noteId);
    navigate(`/notes/${noteId}`);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.innerText);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      <div id="rightsidenote">
        <div id="editorHead">
          <div id="titledate">
            <h2 contentEditable="true" onChange={setTitle}>
              {title}
            </h2>
            <input
              id="time"
              type="datetime-local"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
          <div id="editsavebutton">
            {edit ? (
              <>
                <button className="notebuttons" onClick={() => saveButton()}>
                  Save
                </button>
              </>
            ) : (
              <NavLink to={`./edit`}>
                <button className="notebuttons">Edit</button>
              </NavLink>
            )}
            <button className="notebuttons">Delete</button>
          </div>
        </div>
        {edit ? (
          <div id="mainnotes">
            <ReactQuill theme="snow" value={body} onChange={setBody} />
          </div>
        ) : (
          <ReactQuill readOnly={true} theme={"bubble"} value={body} />
        )}
      </div>
    </>
  );
}

export default Editor;
