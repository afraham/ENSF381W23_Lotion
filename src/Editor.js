import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function Editor({ edit }) {
  const { noteId } = useParams();
  // useOutletContext returns [note]
  const [notes, updateNote] = useOutletContext();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const deleteConfirm = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      deleteNote(noteId);
    }
  };

  const deleteNote = () => {
    
  }

  const saveButton = () => {
    // have state for title and when
    updateNote(
      {
        title: title,
        when: time,
        body: value,
      },
      noteId
    );
    navigate("./" + noteId);
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
            <h2 contentEditable="true" onInput={handleTitleChange}>
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
                <button className="notebuttons" onClick={saveButton}>
                  Save
                </button>
              </>
            ) : (
              <NavLink to={`./edit`}>
                <button className="notebuttons">Edit</button>
              </NavLink>
            )}
            <button className="notebuttons" onClick={deleteConfirm}>
              Delete
            </button>
          </div>
        </div>
        {edit ? (
          <div id="mainnotes">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
        ) : (
          <ReactQuill readOnly={true} theme={"bubble"} value={value} />
        )}
      </div>
    </>
  );
}

export default Editor;
